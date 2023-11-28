import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import warnings
from sklearn.model_selection import train_test_split
from keras.models import load_model
warnings.filterwarnings('ignore')
from keras.layers import Input, Embedding, Flatten, Dot, Dense, Concatenate,Dropout
from keras.models import Model

def train():
#部分文件有字节编码错误，errors 忽略
    with open('BX-Book-Ratings.csv', encoding='utf-8',errors='ignore') as f:
        # 忽略因为数据不规范导致的报错行
        dataset = pd.read_csv(f, error_bad_lines=False, sep=';')
        
    dataset = dataset[['ISBN', 'User_ID', 'Rating']]
    ISBN_val_counts= dataset.ISBN.value_counts()
    map_dict = {}
    for i in range(len(ISBN_val_counts)):
        map_dict[ISBN_val_counts.index[i]] = i
    dataset["ISBN"] = dataset["ISBN"].map(map_dict)
    User_ID_val_counts= dataset.User_ID.value_counts()
    # 映射字典
    user_id_map_dict = {}
    for i in range(len(User_ID_val_counts)):
        user_id_map_dict[User_ID_val_counts.index[i]] = i
    # 将User_ID映射到一串字典
    dataset["User_ID"] = dataset["User_ID"].map(user_id_map_dict)
    train, test = train_test_split(dataset, test_size=0.2, random_state=42)
    train.head()
    
    
    # creating book embedding path
    book_input = Input(shape=[1], name="Book-Input")
    book_embedding = Embedding(n_books+1, 5, name="Book-Embedding")(book_input)
    Dropout(0.2)
    book_vec = Flatten(name="Flatten-Books")(book_embedding)

    # creating user embedding path
    user_input = Input(shape=[1], name="User-Input")
    user_embedding = Embedding(n_users+1, 5, name="User-Embedding")(user_input)
    Dropout(0.2)
    user_vec = Flatten(name="Flatten-Users")(user_embedding)

    # concatenate features
    conc = Concatenate()([book_vec, user_vec])

    # add fully-connected-layers
    fc1 = Dense(128, activation='relu')(conc)
    Dropout(0.2)
    fc2 = Dense(32, activation='relu')(fc1)
    out = Dense(1)(fc2)

    # Create model and compile it
    model2 = Model([user_input, book_input], out)
    model2.compile('adam', 'mean_squared_error')
    if os.path.exists('regression_model2.h5'):
        model2 = load_model('regression_model2.h5')
    else:
        history = model2.fit([train.User_ID, train.ISBN], train.Rating, epochs=10, verbose=1)
        model2.save('regression_model2.h5')
        loss = history.history['loss']  # 训练集损失
        plt.plot(loss,'r')
        plt.title('Training loss')
        plt.xlabel("Epochs")
        plt.ylabel("Loss")