import json


def calculatescore(good,maxmarketprice,maxsold):
    
    price = good['marketPrice']/maxmarketprice
    sold = good['sold']/maxsold
    score = price*0.2 + sold*0.8
    good['score'] = round(score*100,2)
    
def main():
    
    filecontent = open('最新json.txt',encoding='utf-8')
    goods = []
    for line in filecontent:
        goods.append(json.loads(line))
    #print(1)
    maxprice = 0
    maxsold = 0
    for good in goods:
        maxprice = max(maxprice,good['marketPrice'])
        maxsold = max(maxsold,good['sold'])

    print(maxprice)
    print(maxsold)
    
    with open('json.txt','w',encoding='utf-8') as f:
        for good in goods:
            calculatescore(good,maxprice,maxsold)
            f.write(json.dumps(good,ensure_ascii=False))
            f.write('\n')
            #print(good['score'])    
    
if __name__ == "__main__":
    main()