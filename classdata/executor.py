import clean
import fetch
import uniquerooms
import pandas as pd

import datetime as dt

current_time = dt.datetime.today()
nextweek = dt.datetime.today() + dt.timedelta(days=7)
link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=meetings.csv&type=room&term=Spring2023PWL&e:from={0:02d}/{1:02d}/{3}&e:to={4:02d}/{5:02d}/{6}&e:after=800&e:before=2000&r:type=genClassroom&r:size=0..50".format(current_time.day, current_time.month, current_time.year, nextweek.day, nextweek.month, nextweek.year)
filename = "data.csv"
fetch.fetch_from_unitime(link, filename)
# df = pd.read_csv(filename)
# clean.clean_file(df)
# unique_rooms = uniquerooms.find_rooms(df)
