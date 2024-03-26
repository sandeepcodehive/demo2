from flask import Flask, jsonify ,request
from flask_cors import CORS
from flask_pymongo import PyMongo
import jwt
from datetime import datetime,timedelta


app = Flask(__name__)
CORS(app)

# jwt secret key
app.config['SECRET_KEY']='27a47733efab4e16bb46afc136fbf5c8'

app.config["MONGO_URI"]='mongodb://localhost:27017/Demo'
mongo=PyMongo(app)



# @app.route('/')                                   to check connection is established or not 
# def index():
#     if mongo.db.client is not None:
#         return "Monogdb connection is successfully connect"
#     else:
#         return "Failed to connect to Mongodb."



# Register endpoint
@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    username=data.get('auth_username')
    email=data.get('email')
    password=data.get('auth_password')
    
    if mongo.db.auth_database.find_one({'$or':[{'auth_username':username},{'email':email}]}):
        print("username or email is already avaiable")
        return jsonify({'message':"Username or email already exists"}),404
    
    
    mongo.db.auth_database.insert_one({
        'auth_username':username,
        'email':email,
        'auth_password':password
    })
    
    return jsonify({"message":"User registered successfully"}),201

# Login endpoint
@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    username=data.get('auth_username')
    password=data.get('auth_password')
    
    user=mongo.db.auth_database.find_one({'auth_username':username})
    
    
    if user and (user['auth_password'],password) :
        token=jwt.encode({'user_id': str(user['_id']),'exp': datetime.utcnow()+ timedelta(hours=2)},app.config['SECRET_KEY'],algorithm='HS256')
        return jsonify({"message":"Login successfully",'token':token}),200
    else:
        print("Invalid cred!")
        return jsonify({"message":"Invalid username or passs"}),401    


@app.route('/logout',methods=['POST'])
def log_out():    
    return jsonify({'message': 'Logout successful'}),200
    


# Global error handler
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not Found', 'message': 'The requested resource was not found'}), 404


user_responses=[]

@app.route('/get_response',methods=['GET'])
def get_response():
    return jsonify({'response': user_responses})



@app.route('/post_response',methods=['POST'])
def post_response():
    user_input=request.json.get('user_input','')

    if user_input:
        user_responses.append(user_input)
        print(user_responses)

    return '',204
    

if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
    
    
    
    
    
    
# def token_required(func):
#     @wraps(func)
#     def decorated(*args,**kwargs):
#         token=request.args.get('token')
#         if not token:
#             return jsonify({'Alert !': 'Token is missing'})
#         try:
#             payload=jwt.decode(token,app.config['SECRET_KEY'])
#         except:
#             return jsonify({'Alert!':'Invalid Token!'})
#     return decorated

# @app.route('/')
# def home():
#     if not session.get('logged_in'):
#         return render_template('Login')
#     else:
#         return 'Logged in currently'
    
# @app.route('/public')
# def public():
#     return 'For public'

# @app.route('/auth')
# @token_required
# def auth():
#     return 'JWT is verified.Welcome to your dashboard'

# @app.route('/login',methods=['POST'])
# def login():
#     if request.form['username'] and request.form['password']=='12345':
#         session['logged_in']=True
#         token=jwt.encode({
#             'username':request.form['username'],
#             'expiration': str(datetime.utcnow() + timedelta(seconds=120))
#         },
#             app.config['SECRETE_KEY'])

#         return jsonify({'token':token.decode('utf-8')})
    
#     else:
#         return make_response('Unable to verify', 403, {'WWW-Authentication' : 'Basic realm:"Authentication Falied'})    



