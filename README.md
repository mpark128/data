# data

This is the backend work for https://mpark128.github.io/static-app/.
Because github pages only allows static pages, I wrote a json object file into the src folder of my react app that contains all the relevant data needed for the page to run successfully. 
This codebase is all the backend work to populate my postgres database as well as to write the json file. 

update_db.ts
  This is the file used to retrieve data from nba_api (https://github.com/swar/nba_api).
  I fetched data from various nba_api endpoints that is used to populate the database. 
data.ts
  This is the file used to write postgres_data.json into the src folder in my static-app (https://github.com/mpark128/static-app).
  I created a Pool (db.ts) that connected to nba_db (my db for this app), and created an object, which is then written into a json file. 

Postgres Database structure:    

  DATABASE:   nba_db

  TABLES:
  
    player:   id (INT),
              first_name (CHARVAR),
              last_name (CHARVAR),
              team_id (INT),
              position (postition_type[]),
              jsy_number (SMALLINT),
              height_inches (SMALLINT),
              weight_lbs (SMALLINT),
              last_attended (CHARVAR),
              country (CHARVAR),
              draft_year (SMALLINT),
              draft_round (SMALLINT),
              draft_number (SMALLINT),
              from_year (SMALLINT),
              to_year (SMALLINT),
              slug (CHARVAR)
    
    team:     id (INT),
              name (CHARVAR),
              city (CHARVAR),
              abbreviation (CHARVAR),
              conference (conference_type),
              division (division_type),
              slug (CHARVAR)
    
    game:     id (INT),
              season (CHARVAR),
              date (DATE),
              home_id (INT),
              away_id (INT),
              home_score (SMALLINT),
              away_score (SMALLINT)
   
    gamelog:  game_id (INT),
              player_id (INT),
              team_id (INT),
              games_played (SMALLINT), 
              minutes (SMALLINT),
              fgm (SMALLINT),
              fga (SMALLINT),
              fg_pct (REAL),
              ftm (SMALLINT),
              fta (SMALLINT),
              ft_pct (REAL),
              fg3m (SMALLINT),
              fg3a (SMALLINT), 
              fg3_pct (REAL),
              pts (SMALLINT), 
              oreb (SMALLINT), 
              dreb (SMALLINT), 
              reb (SMALLINT), 
              ast (SMALLINT), 
              stl (SMALLINT), 
              blk (SMALLINT), 
              tov (SMALLINT), 
              pf (SMALLINT), 
              plus_minus (SMALLINT), 
              fantasy_pts (REAL)
  
  TYPES:
 
    conference_type:
      LABEL:  Western,
              Eastern

    division_type:
      LABEL:  Atlantic, 
              Central, 
              Southeast, 
              Northwest, 
              Pacific, 
              Southwest

    position_type:
      LABEL:  G, 
              F,
              C
          
