import clean
import fetch

import datetime as dt

current_time = dt.datetime.now()
filename = "data.csv"
link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=meetings.csv&type=room&term=Spring2023PWL&e:from=01/31/2023&e:to=01/31/2023&e:after=800&e:before=1000&r:type=genClassroom&r:size=0..50"
fetch.fetch_from_unitime(link, filename)
clean.clean_file(filename)