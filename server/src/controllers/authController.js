const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ message: "Token requerido" });

    // Validar token con Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Buscar usuario
    let user = await prisma.user.findUnique({
      where: { email }
    });

    // Crear si no existe
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
          avatar: picture
        }
      });
    } else if (!user.googleId) {
      // Vincular si existía sin googleId
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId,
          avatar: user.avatar || picture
        }
      });
    }

    // Generar JWT propio
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
