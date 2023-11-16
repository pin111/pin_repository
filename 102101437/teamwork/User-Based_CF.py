import numpy as np

# 用户-物品评分矩阵
ratings = np.array([
    [5, 3, 0, 0],
    [4, 0, 0, 1],
    [1, 1, 0, 5],
    [0, 0, 4, 4],
    [0, 1, 5, 4],
])

# 用户数量和物品数量
num_users, num_items = ratings.shape

def cosine_similarity(u, v):
    """计算余弦相似度"""
    return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))

# 初始化用户相似度矩阵
user_similarity = np.zeros((num_users, num_users))

# 计算用户之间的相似度
for i in range(num_users):
    for j in range(i, num_users):
        if i == j:
            # 用户与自身的相似度为1
            user_similarity[i][j] = 1
        else:
            user_similarity[i][j] = cosine_similarity(ratings[i], ratings[j])
            user_similarity[j][i] = user_similarity[i][j]

def predict(ratings, user_similarity, user_id):
    """预测用户对未评分物品的兴趣程度"""
    mean_user_rating = ratings.mean(axis=1)
    ratings_diff = ratings - mean_user_rating[:, np.newaxis]
    pred = mean_user_rating[user_id] + user_similarity[user_id].dot(ratings_diff) / np.array([np.abs(user_similarity[user_id]).sum(axis=0)])
    return pred

# 为用户0生成推荐列表
user_id = 0
predictions = predict(ratings, user_similarity, user_id)

# 获取用户0未评分的物品索引
unrated_items = np.where(ratings[user_id] == 0)[0]

# 根据预测评分生成推荐列表
recommendations = unrated_items[np.argsort(-predictions[unrated_items])]

print("推荐列表:", recommendations)