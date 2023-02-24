import pandas as pd
import urllib.request
import datetime as dt

def fetch_from_unitime(link, filename):
    urllib.request.urlretrieve(link, filename)

def clean_file(filename):
    df = pd.read_csv(filename)
    df.drop(df.columns[len(df.columns)-1], axis=1, inplace=True)

def find_rooms(df):
    building = dict()
    for room in df["Location"].unique():
        if building.get(room.split()[0], 0) == 0:
            building[room.split()[0]] = [room.split()[1]]
        else:
            building[room.split()[0]].append(room.split()[1])
    return building

current_time = dt.datetime.today()
nextweek = dt.datetime.today() + dt.timedelta(days=7)
link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=meetings.csv&type=room&term=Spring2023PWL&e:from={0:02d}/{1:02d}/{2}&e:to={3:02d}/{4:02d}/{5}&e:after=800&e:before=2000&r:type=genClassroom&r:size=0..500".format(current_time.month, current_time.day, current_time.year, current_time.month, current_time.day, current_time.year)
print(link)
filename = "data.csv"
fetch_from_unitime(link, filename)
df = pd.read_csv(filename)
clean_file(df)
unique_rooms = find_rooms(df)