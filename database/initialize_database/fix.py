import pandas as pd
import math

# this file was made to just remove a the .0 at the end
# of a lot of id/integer columns that weren't supposed to
# be floats. Idk how they got there
# ex: 12345.0 -> 12345


# path = "../tables/" + "Character.csv"
# character = pd.read_csv(path)

# print(character.isna().sum())
# print(character[character.isna()])

# character['id'] = character['id'].astype(int)
# character['id'] = pd.to_numeric(character['id'])
# character.to_csv(path, index=False)



# path = "../tables/" + "Anilist_User.csv"
# user = pd.read_csv(path)
#
# print(user.isna().sum())
#
# user['created_at'] = user['created_at'].astype(str).apply(lambda x: int(float(x)) if not math.isnan(float(x)) else "")
# user.to_csv(path, index=False)