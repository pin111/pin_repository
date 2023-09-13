import jieba
from collections import Counter
from wordcloud import WordCloud
import imageio
from pyinstrument import Profiler
def creat_wordcloud():
    
    #代码性能分析
    
    profiler=Profiler()
    profiler.start()
    
    #获得弹幕数据并分词
    
    barrage_data = open('弹幕1.txt', 'r',encoding = 'utf-8').read()
    words = jieba.lcut(barrage_data)
    
    #生成词云图
    
    stopwords = open(r'D:\桌面\1\停用词.txt','r',encoding = 'utf-8').read() #停用词
    stopwords_list = stopwords.split('\n')
    background=imageio.v2.imread(r'D:\桌面\1\bk.jpg') #背景
    txt=" ".join(words)
    w=WordCloud(scale=5,max_font_size=50,
    font_path="simsun.ttc",colormap='cool_r',
    background_color='white',mask=background,
    stopwords=stopwords_list,max_words=5000)
    
    #保存词云图
    
    w.generate(txt)
    w.to_file(r'D:\桌面\1\词云图.jpg')
    
    #代码性能分析结果
    
    profiler.stop()
    profiler.print()
    
if __name__ == "__main__":
    creat_wordcloud()


