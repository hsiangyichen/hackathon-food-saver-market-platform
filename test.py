from dotenv import (
    load_dotenv,
    find_dotenv,
    set_key
)
import csv

import pymysql,logging
db = pymysql.connect(
        host="127.0.0.1",
        user="Yaksa",
        passwd="tarkers1117",
        database='storedb')
cursor = db.cursor()
with open('store.csv', newline='',encoding='utf-8-sig') as csvfile:
  # 讀取 CSV 檔內容，將每一列轉成一個 dictionary
  rows = csv.DictReader(csvfile)
  # 以迴圈輸出指定欄位
  i=0
  for row in rows:
    email=row['kind']+"_"+str(i)+"@gmail.com"
    i+=1
    print((row['name'],row['address'],row['tel'],row['kind'],row['enabletime'],email) ) 
    sql = "INSERT INTO store(name,address,tel,kind,enabletime,email) VALUES (%s,%s,%s,%s,%s,%s)"
    val =(row['name'],row['address'],row['tel'],row['kind'],row['enabletime'],email) 
    cursor.execute(sql,val)
    # break
db.commit()
db.close()