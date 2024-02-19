# from extensions import connection
from datetime import datetime
from models import Job
from extensions import connection
from  flask import Blueprint,jsonify,request
from models import init_db
from flask_jwt_extended import jwt_required,get_jwt_identity

CREATE_NEW_JOB=(
    # "CREATE TABLE IF NOT EXISTS job (job_id  SERIAL PRIMARY KEY, title TEXT , description TEXT,category TEXT, additional_information TEXT,location TEXT,difficulty Text ,duration INT,wage INT, datetime TIMESTAMP, company_id SERIAL REFERENCES company(id) ON DELETE CASCADE,user_id INT REFERENCES users(id) ON DELETE CASCADE);"
    "CREATE TABLE IF NOT EXISTS job (job_id  SERIAL PRIMARY KEY, title TEXT , description TEXT,category TEXT, additional_information TEXT,location TEXT,difficulty TEXT ,duration INT,wage INT, datetime TIMESTAMP, company_id SERIAL REFERENCES company(id) ON DELETE CASCADE);"
)
INSERT_NEW_JOB=(
    "INSERT INTO job ( title, description, category, additional_information, location, difficulty, duration, wage, datetime, company_id) VALUES (%s , %s , %s , %s, %s, %s, %s, %s, %s, %s) RETURNING job_id;"
)
GET_COMPANY_ID=(
    "SELECT id FROM company WHERE email = %s"
)

GET_ALL_JOB=(
    "SELECT row_to_json(job) AS result FROM job"
)
GET_JOBS_BY_COMPANY_ID=(
    "SELECT row_to_json(job) AS result FROM job WHERE company_id=%s"
)

GET_COMPANY_ID_BY_NAME=(
    "SELECT id FROM company WHERE name=%s"
)

GET_JOB_BY_WAGE_RANGE=(
    "SELECT row_to_json(job) AS result  FROM job WHERE wage BETWEEN %s AND %s"
)

GET_JOB_BY_JOB_ID=(
    "SELECT row_to_json(job) AS result  FROM job WHERE job_id=%s"
)

UPDATE_JOB_WITH_USER=(
    "UPDATE job SET user_id=%s WHERE job_id=%s"
)
UPDATE_USER_WITH_JOB=(
    "UPDATE users SET job_id=%s WHERE id=%s"
)
GET_USER_WITH_JOB_ID=(
    "SELECT id FROM users WHERE email=%s"
)



user_bp=Blueprint('users',__name__)
job_bp=Blueprint('jobs',__name__)


@job_bp.post("/createjob")
@jwt_required()
def create_job():
    data=request.get_json()
    company_email=get_jwt_identity()
    name=data.get('name')
    description=data.get('description')
    wage=data.get('wage')
    category=data.get('category')
    additional_information=data.get('additional_information'),
    location=data.get('location')
    difficulty=data.get('difficulty')
    duration=data.get('duration')
    datetimes=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(CREATE_NEW_JOB)
                cursor.execute(GET_COMPANY_ID,(company_email,))
                company_id=cursor.fetchone()[0]
                cursor.execute(INSERT_NEW_JOB,(name, description, wage,category,additional_information,location,difficulty,duration, datetimes,company_id))
                job_id=cursor.fetchone()[0]
                return jsonify({"id":job_id,"message":"Job " +name +" created"}),201
            except Exception as e:
                print(e)
    return jsonify({"message":"Cannot create job"})

@job_bp.get('/all')
def get_all_jobs():
   with connection:
    with connection.cursor() as cursor:
        try:
            cursor.execute(GET_ALL_JOB)
            jobs=cursor.fetchall()
            return jsonify({"result":jobs})
        except Exception as e:
            print(e)
    return jsonify({"message":"cannot get jobs"})
    
@job_bp.get('/company_job')
def get_all_jobs_by_compnay_name():
    querry=request.args.get("name")
    with connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(GET_COMPANY_ID_BY_NAME,(querry,))
                company_id=cursor.fetchone()[0]
                if company_id >0:
                    cursor.execute(GET_JOBS_BY_COMPANY_ID,(company_id,))
                    job=cursor.fetchall()
                    return jsonify({"result":job})
            except Exception as e:
                print(e)
    return jsonify({"error":"0 Results"})


@job_bp.get("/all/job_by_wage")
def get_job_between_wage():
    max_price=request.args.get('max_price',type=int)
    min_price=request.args.get('min_price',type=int)

    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_JOB_BY_WAGE_RANGE,(min_price,max_price,))
            jobs=cursor.fetchall()
            return jsonify({"result":jobs})
        
@job_bp.get('/get_job')
def get_job():
    job_id=request.args.get('job_id')
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(GET_JOB_BY_JOB_ID,(job_id,))
                data=cursor.fetchall()
                print(data)
                return jsonify({"result":data})
    except Exception as e:
        print(e)
    return jsonify({"message":"Cannot find job!!"})

@job_bp.put("/apply")
@jwt_required()
def apply_task():
    user_email=get_jwt_identity()
    job_id=request.args.get('job_id')
    print(user_email)
    print(job_id)
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(GET_USER_WITH_JOB_ID,(user_email,))
                user_id=cursor.fetchone()[0]
                print(user_id)
                cursor.execute(UPDATE_JOB_WITH_USER,(user_id,job_id,))
                cursor.execute(UPDATE_USER_WITH_JOB,(job_id,user_id,))
                cursor.execute()
                return jsonify({"result": "user with user id:"+str(user_id)+ "applied to job:"+str(job_id)})
            
    except Exception as e:
        print(e)
    return jsonify({"message":"Failed to apply"})



if __name__ == '__main__':
    init_db()