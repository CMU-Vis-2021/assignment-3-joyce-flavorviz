import pandas as pd
import numpy as np
from itertools import chain
from pandas.core.algorithms import unique

def process2():
    #dropping outliers -- ingredients that only appeared once
    df = pd.read_csv("data/primative.csv")
    wo_outliers = df[df['sum'] > 1.0]

    #calculate things in terms of percentages
    col = list(df.columns)
    sums = pd.Series.to_list(wo_outliers.sum())
    sums[0] = 'total'
    print(len(col))
    print(len(sums))
    print(col)
    print(sums)
    #convert everything to a percentage of the total 
    #row= freq of one ing /
    for i in range(1, len(col)):
        c = col[i]
        wo_outliers[c] =  round(np.divide(wo_outliers[c], sums[i]), 4) * 100
        wo_outliers[c] = np.where(wo_outliers[c] <= 0.1, 0.1, wo_outliers[c])

        #find in which column is it most common, set it as its color
    wo_outliers = wo_outliers.set_index("ingredients")

    maxValue = wo_outliers.idxmax(axis="columns")
    final = pd.concat([wo_outliers, maxValue], axis=1)
    print(final)

    
    
    final.to_csv("data/wo_outliers_percent.csv")

process2()


'''#bottom code is first round processing
df = pd.io.json.read_json("data/train.json")
cui = pd.Series.to_list(df["cuisine"])
ing = pd.Series.to_list(df["ingredients"])

#filter out all the unique ingredients
all = list(chain.from_iterable(ing))
unique_ing = np.unique(np.array(all))
unique_cui = np.unique(df["cuisine"])
rows = unique_ing.tolist()
columns = unique_cui.tolist()
columns.insert(0, 'ingredients')
columns.append('sum')
print("total ing:" + str(len(unique_ing)))
print("total cui:" + str(len(unique_cui)))
#make a data fram with ingreidents on the row and cusine on the col 

ing_count = len(rows)
cui_count = len(columns)
#init
data_init = np.zeros((ing_count, cui_count))
base = pd.DataFrame(data=data_init,columns=columns)
base['ingredients'] = rows
base = base.set_index('ingredients')

#now fill in data
holder = [[] for j in range(len(columns))]
for i in range(0, len(ing)):
    index = columns.index(cui[i])
    list = ing[i]
    for item in list:
        holder[index].append(item)

for i in range(0, len(columns)):
    for item in holder[i]:
        base.loc[item, columns[i]] += 1
        base.loc[item, 'sum'] += 1

print(base)
base.to_csv("primative.csv")

'''
