import pandas as pd
import json

# Let's inspect the exact vehicles in vehicles.json vs the source file 'ข้อมูลรถยนต์.xlsx'
df_cars = pd.read_excel('ข้อมูลรถยนต์.xlsx')
print(df_cars.dropna(how='all'))