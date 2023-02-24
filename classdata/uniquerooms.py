import pandas as pd

def find_rooms(df):
    return list(df["Location"].unique())