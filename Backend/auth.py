from  flask import Blueprint,jsonify,request
from models import User,Company
from datetime import datetime
from extensions import connection
import time
from flask_cors import CORS, cross_origin
from psycopg2.extras import Json
from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import jwt_required,get_jwt_identity


authUser_bp=Blueprint('auth/user',__name__)
authComp_bp=Blueprint('auth/company',__name__)

#Company
CREATE_NEW_COMPANY=(
    "CREATE TABLE IF NOT EXISTS company (id SERIAL PRIMARY KEY , name TEXT , email TEXT UNIQUE , password TEXT, datetime TIMESTAMP );"
)
INSERT_NEW_COMPANY=(
    "INSERT INTO company ( name, email, password, datetime) VALUES (%s , %s , %s , %s) RETURNING id;"
)
GET_COMPANY_EMAIL=(
    "SELECT COUNT(*) FROM company WHERE email = %s"
)
GET_COMPANY_PROFILE=(
     "SELECT row_to_json(company) AS result  FROM company WHERE email = %s"
)
GET_HASHED_PASSWORD_COMPANY=(
    "SELECT password FROM company WHERE email = %s"
)

#User

CREATE_NEW_USER=(
    # "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT , email TEXT UNIQUE ,location TEXT DEFAULT '', bio TEXT DEFAULT '',  password TEXT,specialization TEXT[]  DEFAULT '{}',intrested_work_places JSON  DEFAULT '{}',rewards INT DEFAULT '0',appliedQuest INT REFERENCES job(job_id) ON DELETE CASCADE , datetime TIMESTAMP );"
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT , email TEXT UNIQUE ,location TEXT DEFAULT '', bio TEXT DEFAULT '',  password TEXT ,specialization TEXT  DEFAULT '', intrested_work_places JSON  DEFAULT '{}',rewards INT DEFAULT '0', datetime TIMESTAMP );"
)

INSERT_NEW_USER=(
    "INSERT INTO users ( name, email ,password, datetime) VALUES (%s ,%s, %s ,%s) RETURNING id;"
)

GET_USER_EMAIL=(
    "SELECT COUNT(*) FROM users WHERE email = %s"
)
GET_USER_PROFILE=(
     "SELECT row_to_json(users) AS result  FROM users WHERE email = %s"
)
GET_USER_PROFILE_LOGIN=(
     "SELECT users AS result  FROM users WHERE email = %s"
)
GET_HASHED_PASSWORD_USER=(
    "SELECT password FROM users WHERE email = %s"
)

##########  User Authentication  #############

#Signup
@authUser_bp.post('/register')
def register_user():
    data=request.get_json()
    name=data.get('name')
    email=data.get('email')
    # bio=data.get('bio')
    # specialization=data.get('specialization')
    # intrested_work_places=data.get('intrested_work_places')
    # intrested_work_places=Json(intrested_work_places)
    password=data.get('password')
    hashed_password=generate_password_hash(password=password)
    datetimes=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(CREATE_NEW_USER)
                cursor.execute(GET_USER_EMAIL,(email,))
                answer=cursor.fetchone()[0]
                if answer:
                    return jsonify({"message":"User already exist"})
                else:
                    # cursor.execute(INSERT_NEW_USER,(name,bio,email,hashed_password,specialization,intrested_work_places ,datetimes,))
                    cursor.execute(INSERT_NEW_USER,(name,email,hashed_password,datetimes,))
                    return  jsonify({"message":"User account created"}),201
            except Exception as e:
                    print(e)

    return  jsonify({"message":"Failed to create user"}),400


#Login
@authUser_bp.post('/login')
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def login_user():

    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    access_token=create_access_token(identity=email)
    refresh_token=create_refresh_token(identity=email)
    try:
        with connection:
            with connection.cursor() as cursor:
                    cursor.execute(CREATE_NEW_USER)
                    cursor.execute(GET_USER_EMAIL,(email,))
                    answer=cursor.fetchone()[0]
                    if answer:
                        try:
                            cursor.execute(GET_HASHED_PASSWORD_USER,(email,))
                            hashed_password=cursor.fetchone()[0]
                            if answer and  check_password_hash(hashed_password,password):
                                cursor.execute(GET_USER_PROFILE,(email,))
                                user=cursor.fetchall()
                                print(user)
                                # return jsonify({"user":user,"token":access_token})
                                return jsonify({"message":"Loggedin successfully","user":user,"access_token":access_token,"refresh_token":refresh_token})
                        except Exception as e:
                            print(e)
                    else:
                        return jsonify({"message":"User Doesn't Exists"})
    except Exception as e:
         print(e)
    return jsonify({"error":"Invalid email or password"}),400

#profile user
@authUser_bp.get('/profile')
@jwt_required()
def get_user():
    user_email=get_jwt_identity()
    try:
        with connection:
            with connection.cursor() as cursor:
                    cursor.execute(GET_USER_PROFILE,(user_email,))
                    data=cursor.fetchone() 
                    return jsonify({"result":data})
    except Exception as e:
                print(e)
    return jsonify({"result":"User Doesn't exists"}),400
    
     


##########  Comapany Authentication  #############

#Signup
@authComp_bp.post('/register')
def register_company():
    data=request.get_json()
    name=data.get('name')
    email=data.get('email')
    password=data.get('password')
    datetimes=datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    hashedPassword=generate_password_hash(password)
    
    with connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(CREATE_NEW_COMPANY)
                    cursor.execute(GET_COMPANY_EMAIL,(email,))
                    answer=cursor.fetchone()[0]
                except Exception as e:
                    print(e)
            with connection.cursor() as cursor:
                try:
                    if answer:
                        return jsonify({"message":"Company already exist"})
                    else:
                        cursor.execute(INSERT_NEW_COMPANY,(name, email, hashedPassword, datetimes))
                        return  jsonify({"message":"Company account created"}),201
                except Exception as e:
                        print(e)

    return  jsonify({"message":"Failed to create"}),400




#Login
@authComp_bp.post('/login')
def login_company():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')
    access_token=create_access_token(identity=email)
    refresh_token=create_refresh_token(identity=email)
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(CREATE_NEW_COMPANY)
                cursor.execute(GET_COMPANY_EMAIL,(email,))
                answer=cursor.fetchone()
                if answer:
                    try:
                        cursor.execute(GET_HASHED_PASSWORD_COMPANY,(email,))
                        hashed_password=cursor.fetchone()[0]
                        if answer and  check_password_hash(hashed_password,password):
                            cursor.execute(GET_COMPANY_PROFILE,(email,))
                            user=cursor.fetchall()
                            return jsonify({"message":"Loggedin successfully","user":user,"access_token":access_token,"refresh_token":refresh_token}),201

                    except Exception as e:
                         print(e)
            except Exception as e:
                    print(e)

    return jsonify({"error":"Invalid name or password"}),400

   

