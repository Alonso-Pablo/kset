const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10
const { Schema } = mongoose

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese su nombre de usuario'],
    minlength: [4, 'El nombre de usuario no puede contener menos de 4 caracteres'],
    maxlength: [16, 'El nombre de usuario no puede contener mas de 16 caracteres'],
    match: [/^[a-zA-Z_]{4,16}$/g, 'El formato de nombre de usuario ingresado es invalido'],
    validate: {
      validator: function(v){
        return this.model('Users').findOne({ name: v }).then(user => !user)
      },
      message: props => `${props.value} ya esta siendo usado por otro usuario`
    },
    index: {
      unique: true
    },
    trim: true,
  },
  email: {
    type: String,
    unique: 'El email ({VALUE}) ya esta siendo usado, por favor elija otro',
    required: [true, 'Por favor ingrese su email'],
    minlength: [6, "El email no puede contener menos de 6 caracteres"],
    maxlength: [60, 'El email no puede contener mas de 60 caracteres'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Formato de Email invalido'],
    validate: {
      validator: function(v){
        return this.model('Users').findOne({ email: v }).then(user => !user)
      },
      message: props => `${props.value} ya esta siendo usado por otro usuario`
    },
    lowercase: true,
    trim: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese contraseña'],
    minlength: [8, 'La contraseña no puede contener menos de 8 caracteres'],
    maxlength: [20, 'La contraseña no puede contener mas de 20 caracteres'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Formato de Password invalido'],
  },
  date: Date
})


userSchema.pre('save', function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

module.exports = mongoose.models.Users || mongoose.model('Users', userSchema)
