import json
file = open("classdata/address.txt", "r")
line = file.readline()
splitted = line.split(", ")
splitted = [string.replace("'", "") for string in splitted]
splitted = [string.replace(":", "") for string in splitted]
split2 = [(string.split()[0], " ".join(string.split()[1:])) for string in splitted]
class_dict = {}
for pair in split2:
    class_dict[pair[0]] = pair[1]

with open("classdata/build_address.json", "w") as outfile:
    json.dump(class_dict, outfile)