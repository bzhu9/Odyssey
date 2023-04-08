import pandas as pd

def clean_file(df):
    df.drop(df.columns[len(df.columns)-1], axis=1, inplace=True)
    for i in range(len(df)):
        start = df.at[i, 'Published Start']
        if start[-1] == 'a' or start[0:2] == '12':
            if len(start.split(':')[0]) == 1:
                df.at[i, 'Published Start'] = '0%s' %(start[:-1])
            else:
                df.at[i, 'Published Start'] = start[:-1]
        elif start == 'noon':
            df.at[i, 'Published Start'] = '12:00'
        else:
            hour = int(start.split(':')[0])
            hour += 12
            rest = start.split(':')[1]
            df.at[i, 'Published Start'] = '%d:%s' %(hour,rest[0:2])


        end = df.at[i, 'Published End']
        if end[-1] == 'a' or end[0:2] == '12':
            if len(end.split(':')[0]) == 1:
                df.at[i, 'Published End'] = '0%s' %(end[:-1])
            else:
                df.at[i, 'Published End'] = end[:-1]
        elif end == 'noon':
            df.at[i, 'Published End'] = '12:00'
        else:
            hour = int(end.split(':')[0])
            hour += 12
            rest = end.split(':')[1]
            df.at[i, 'Published End'] = '%d:%s' %(hour,rest[0:2])

        df.at[i, 'Building'] = df.at[i, 'Location'].split()[0]
        df.at[i, 'Room'] = df.at[i, 'Location'].split()[1]

def combine_time(df):
    for i in range(len(df)):
        df.at[i, "Start Time"] = df.at[0, "Date"] + "T" + df.at[0, "Published Start"]
        df.at[i, "End Time"] = df.at[0, "Date"] + "T" + df.at[0, "Published End"]

def convert_iso(df):
    df["Start Time"] = pd.to_datetime(df['Start Time']).dt.strftime('%m-%d-%YT%H:%M')
    df["End Time"] = pd.to_datetime(df['End Time']).dt.strftime('%m-%d-%YT%H:%M')

def drop_useless_cols(df):
    df = df[['Name', 'Section', 'Start Time', 'End Time', 'Building', 'Room', 'Capacity', 'Address', 'lat', 'long']]

def insert_address(df, address):
    df = pd.merge(df, address, on="Building")

def insert_beg_end(df, address):
    for date in set(df["Date"]):
        for classroom in set(df["Location"]):
            df.loc[len(df)] = [pd.NA, pd.NA, pd.NA, pd.NA, pd.NA, date, '06:00', '6:00', classroom, pd.NA, pd.NA, pd.NA, pd.NA, pd.NA]
            df.loc[len(df)] = [pd.NA, pd.NA, pd.NA, pd.NA, pd.NA, date, '22:00', '22:00', classroom, pd.NA, pd.NA, pd.NA, pd.NA, pd.NA]





df = pd.read_csv("meetings.csv")
