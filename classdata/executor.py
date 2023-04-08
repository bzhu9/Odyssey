import pandas as pd
import urllib.request
import datetime as dt

def fetch_from_unitime(day_diff, filename="data.csv", start_hour=8, end_hour=22, min_size=0, max_size=500):
    if filename[-4:] != ".csv":
        raise Exception("file must be a csv file")
    if day_diff < 0:
        raise Exception("Day difference must be non-negative")
    if day_diff == 0:
        if start_hour > end_hour:
            raise Exception("Start time must be before end time")
    if start_hour > 23 or end_hour > 23:
        raise Exception("hour must be less than 24")
    if min_size > max_size:
        raise Exception("max_size must be greater than min_size")
    if min_size < 0 or max_size < 0:
        raise Exception("Class size must be non-negative")
    current_time = dt.datetime.today()
    time_delta = dt.datetime.today() + dt.timedelta(days=day_diff)


    link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=events.csv&type=room&term=Spring2023PWL&e:from={0:02d}/{1:02d}/{2}&e:to={3:02d}/{4:02d}/{5}&e:after={6}00&e:before={7}00&r:type=genClassroom&r:size={8}..{9}".format(current_time.month, current_time.day, current_time.year, time_delta.month, time_delta.day, time_delta.year, start_hour, end_hour, min_size, max_size)
    urllib.request.urlretrieve(link, '/Users/seanlee/Library/CloudStorage/OneDrive-purdue.edu/2/307/Odyssey/classdata/%s'%filename)

def clean_file(df):
    df.drop(df.columns[len(df.columns)-1], axis=1, inplace=True)
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

def find_rooms(df):
    building = dict()
    for room in df["Location"].unique():
        if building.get(room.split()[0], 0) == 0:
            building[room.split()[0]] = [room.split()[1]]
        else:
            building[room.split()[0]].append(room.split()[1])
    return building


# filename = "data.csv"
# fetch_from_unitime(0, filename, 6, 22, 0, 500)
df = pd.read_csv("week.csv")
clean_file(df)
unique_rooms = find_rooms(df)
len(unique_rooms)