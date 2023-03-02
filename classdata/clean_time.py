import pandas as pd


def clean_time(df):
    for i in range(len(df)):
        start = df.at[i, 'Published Start']
        end = df.at[i, 'Published End']
        if start[-1] == 'a' or start[0:2 == '12']:
            df.at[i, 'Published Start'] = start[:-1]
        elif start == 'noon':
            df.at[i, 'Published Start'] = '12:00'
        else:
            hour = int(start.split(':')[0])
            hour += 12
            rest = start.split(':')[1]
            df.at[i, 'Published Start'] = '%d:%s' %(hour,rest[0:2])
        if end[-1] == 'a' or end[0:2 == '12']:
            df.at[i, 'Published End'] = end[:-1]
        elif end == 'noon':
            df.at[i, 'Published End'] = '12:00'
        else:
            hour = int(end.split(':')[0])
            hour += 12
            rest = end.split(':')[1]
            df.at[i, 'Published End'] = '%d:%s' %(hour,rest[0:2])