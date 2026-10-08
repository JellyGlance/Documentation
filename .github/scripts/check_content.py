import json, os, re, subprocess, sys
from urllib.parse import unquote

files = subprocess.check_output(["git", "ls-files", "-z"]).decode().split("\0")
errors = []
warnings = []
names = {os.path.basename(x) for x in files if x} | {os.path.splitext(os.path.basename(x))[0] for x in files if x}
link_re = re.compile(r"\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
for f in filter(None, files):
    low = f.lower()
    if low.endswith(".json"):
        try:
            with open(f, encoding="utf-8-sig") as fh:
                json.load(fh)
        except Exception as e:
            errors.append(f"{f}: invalid JSON ({e})")
    if low.endswith((".md", ".json", ".yml", ".yaml", ".txt", ".sh")):
        try:
            with open(f, encoding="utf-8", errors="replace") as fh:
                text = fh.read()
        except OSError:
            continue
        if re.search(r"^(<{7} |>{7} )", text, re.M):
            errors.append(f"{f}: contains merge conflict markers")
        if low.endswith(".md"):
            for target in link_re.findall(text):
                if re.match(r"^([a-z][a-z0-9+.-]*:|#|/)", target, re.I):
                    continue
                path = unquote(target.split("#")[0])
                if path and not os.path.exists(os.path.join(os.path.dirname(f), path)) and not os.path.exists(path) and os.path.basename(path) not in names:
                    warnings.append(f"{f}: broken relative link -> {target}")
for w in warnings:
    print(f"::warning::{w}")
for e in errors:
    print(f"::error::{e}")
print(f"Checked {len([x for x in files if x])} files: {len(errors)} errors, {len(warnings)} warnings")
sys.exit(1 if errors else 0)
