import os
import re

re_find_link: re.Pattern = re.compile("\[(.*?)\]\((.*?)\)")

from typing import Dict


def load_markdown(path: str) -> Dict[str, str]:
    """
    从一个目录里递归读取全部的 .md 文件，返回的文件的路径和内容。
    """
    dirs = os.listdir(path)
    result: Dict[str, str] = {}

    for oneDir in dirs:
        full_path: str = os.path.abspath(os.path.join(path, oneDir))
        if os.path.isdir(full_path):
            result.update(load_markdown(full_path))
        elif oneDir.endswith(".md"):
            f = open(full_path, "r", encoding='utf-8')
            result[full_path] = f.read()
            f.close()

    return result


def parse_parse_links(markdown: str) -> Dict[str, str]:
    """
    从 markdown 文件中解析资源引用，返回引用标题和文件路径（相对 markdown 的路径）
    """
    lines = markdown.splitlines()
    result = {}
    for line in lines:
        find_link = re_find_link.findall(line)
        for link in find_link:
            result[link[0]] = link[1]
    return result


if __name__ == '__main__':
    srcDir = os.path.abspath(os.path.join(__file__, "../../"))
    markdowns = load_markdown(srcDir)
    count = 0
    for m, v in markdowns.items():
        for i in v:
            if ord(i) > 255:
                count += 1
    print(count)
