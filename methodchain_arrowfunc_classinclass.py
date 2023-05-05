class exClass:
    def __init__(self,i):
        self.i = i
    def sum(self,x):
        y = x + self.i
        return exClass2(y)
class exClass2:
    def __init__(self,i):
        self.i = i
    def multi(self,x):
        return self.i * x

c = True if 43 > 44 else False 

testin = exClass(10)
test2 = testin.sum(2).multi(3)
print(test2)
print(c)