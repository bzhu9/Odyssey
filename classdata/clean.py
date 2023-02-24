import pandas as pd
import datetime as dt

def clean_file(filename):
    df = pd.read_csv(filename)
    df.drop(df.columns[len(df.columns)-1], axis=1, inplace=True)
    return df