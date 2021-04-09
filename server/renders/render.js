const home = (req, res) => {
  try {
    res.render('home')
  } catch (err) {
    console.log(err)
  }
}

const chat = (req, res) => {
  try {
    req.session.username = req.body.username
    req.session.save()

    res.render('chat')
  } catch (err) {
    console.log(err)
  }
}
module.exports = {
  home,
  chat,
}
