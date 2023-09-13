import requests
import re
from urllib.parse import quote
from pyinstrument import Profiler

def searchPage(keyword, pageNumber=1, pageSize=30):
    #爬取搜索页面数据
    
    searchUrl = f"https://search.bilibili.com/all?keyword={keyword}&search_source=5&page={pageNumber}&o=30"
    headers = {   #请求头，让爬虫模拟用户访问链接
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Content-Type": "text/html; charset=utf-8",
    }

    page = requests.get(url=searchUrl, headers=headers) 
    
    #正则匹配获得页面中视频的bvid
    
    pattern = r"(BV.{10})" 
    urlList = re.findall(pattern, page.text) 
    return list(set(urlList))

if __name__ == "__main__":
    
    #代码性能分析
    
    profiler=Profiler()
    profiler.start()
    
    url = []
    
    #爬取1-50页的bvid并去重存入bvid.txt
    
    for i in range(1, 50): 
        temp = searchPage("日本核污染水排海", i)
        url.extend(temp) 
    url = list(set(url)) 
    print(len(url)) 
    with open("bvid.txt", "w") as fp: 
        for i in url:
            fp.write(i + "\n")

    #代码性能分析结果
    
    profiler.stop()
    profiler.print()