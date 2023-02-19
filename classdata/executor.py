import clean
import fetch

import datetime as dt

current_time = dt.datetime.today()
today = current_time.date
nextweek = dt.datetime.today() + dt.timedelta(days=7)
link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=meetings.csv&type=room&term=Spring2023PWL&e:from={0:02d}/{1:02d}/{3}&e:to={4:02d}/{5:02d}/{6}&e:after=800&e:before=2000&r:type=genClassroom&r:size=0..50".format(today.day, today.month, today.year, nextweek.day, nextweek.month, nextweek.year)
filename = "data.csv"
fetch.fetch_from_unitime(link, filename)
clean.clean_file(filename)