from summa import keywords
from jieba.analyse import *
def keyword_english():
    with open('text.txt') as f:
        full_text = f.read()
    tr_keywords = keywords.keywords(full_text,scores=True)
    #for i in range(10):
    #print(tr_keywords[0:10])
    for keyword in tr_keywords[0:10]:
        print(keyword)
def keyword_chinese():
    with open('text1.txt',encoding='utf-8') as f1:
        full_text = f1.read()
    for keyword,weight in textrank(full_text,withWeight = True):
        print(keyword,weight)
if __name__ == "__main__":
    keyword_chinese()
    keyword_english()