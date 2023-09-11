import requests
import re
def Getbarrage(bvid):
    
    #获得视频的解析版网页链接
    
    url = 'https://www.ibilibili.com/video/'+bvid 
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Content-Type": "text/html; charset=utf-8",
    }
    
    #爬取视频弹幕链接
    
    analyticalpage = requests.get(url = url,headers = headers)
    analyticalpage.encoding = analyticalpage.apparent_encoding
    barrageurl_list = re.findall('<a href="(.*?)"  class="btn btn-default" target="_blank">弹幕</a>',analyticalpage.text)   
    barrageurl = ''.join(barrageurl_list)
    
    #爬取弹幕并保持入弹幕1.txt
    
    response=requests.get(url = barrageurl,headers = headers)
    response.encoding = response.apparent_encoding
    barrage_list = re.findall('<d p=".*?">(.*?)</d>',response.text)
    for barrage in barrage_list:
        with open('弹幕1.txt',mode = 'a',encoding = 'utf-8') as file:
            file.write(barrage)
            file.write('\n')
            
if __name__ == "__main__":
    
    #获取前300个视频的所以弹幕
    
    file = open('bvid.txt', 'r')
    bvid_data = file.read()
    print(bvid_data)
    bvid_list=bvid_data.split('\n')
    for bvid in bvid_list[:300]:
        print(bvid)
        Getbarrage(bvid)
    file.close()