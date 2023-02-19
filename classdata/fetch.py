import urllib.request
import os

link = "https://timetable.mypurdue.purdue.edu/Timetabling/export?output=meetings.csv&type=room&term=Spring2023PWL&e:from=01/31/2023&e:to=01/31/2023&e:after=800&e:before=1000&r:type=genClassroom&r:size=0..50"
urllib.request.urlretrieve(link, "import_data.csv")