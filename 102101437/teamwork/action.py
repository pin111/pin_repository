from keyword_1 import keyword_chinese,keyword_english

brands = ['瑞幸','星巴克','幸运咖','Manner Coffee','Tims咖啡']
goods = ['拿铁','摩卡','美式咖啡','卡布奇诺']


class action:
    
    def __init__(self):
        
        self.brand = ''
        self.good = ''
        self.brand_state = False
        self.good_state = False
    
    def update_state(self,num):
        
        if num == 1:
            self.brand_state = True
        else:
            self.good_state = True
            
    def judgment(self,search_information):
        
        nums = 1
        for brand in brands:
            if brand in search_information:
                nums = 1
                self.brand = brand
                self.update_state(nums)
        for good in goods:
            if good in search_information:
                nums = 2
                self.good = good
                self.update_state(nums)
          
    def clear(self):
        
        self.brand = ''
        self.good = ''
        self.brand_state = False
        self.good_state = False
        
    def display(self):
        
        if self.brand_state:
            if self.good_state:
                print('当前action结构判断用户所需要获取的信息为'+self.brand+'品牌的'+self.good+'类型商品的信息')
            else:
                print('当前action结构判断用户所需要获取的信息为'+self.brand+'品牌的信息')
        else:
            if self.good_state:
                print('当前action结构判断用户所需要获取的信息为'+self.good+'类型商品的信息')
            else:
                print('当前action结构判断用户所需要获取的信息无')
        
if __name__ == "__main__":
    
    action1 = action()
    search_information = input('模拟输入搜索信息：')
    action1.judgment(search_information)
    action1.display()