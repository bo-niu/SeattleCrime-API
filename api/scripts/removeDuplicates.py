import pandas as pd

d = pd.read_csv('C:/delete/importCSV/SeattleCrime-GroupRobot.csv')

d.drop_duplicates(inplace = True)

d.to_csv('C:/delete/importCSV/SeattleCrime-GroupRobot-RemoveDuplicates.csv', index = False)