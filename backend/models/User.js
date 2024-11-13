const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const {isEmail} = require('validator')


const SALT_WORK_FACTOR = 10;



const userSchema = new mongoose.Schema(
    {
      name: {
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 55,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 6
      },
      image:{
          type:String,
          default:"./uploads/profil/random-user.png"
      },
      bio :{
        type: String,
        maxlength: 1024,
      },
      isActive: { type: Boolean, default: false },
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
    },
    {
      timestamps: true,
    }
  );


  userSchema.pre("save", async function (next) {
    if(!this.isModified('password'))return next();
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }catch(err){
        return next(err);
    }
  })


  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email }).populate('roles');

    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if(!user.isActive){
        throw Error(`Vous devez activer votre compte grace au mail d'activation envoyé à ${user.email}`)
      } 
      if (auth && user.isActive) {
        return user;
      }
      throw Error("Mot de passe est incorret");
     
    }
    throw Error("l'email est incorret")
  };

module.exports = mongoose.model('User', userSchema)
  
