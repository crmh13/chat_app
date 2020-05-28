import app from '../server/index.ts'
import request from 'supertest'
import { User } from '../src/entities/User'
import bcrypt from 'bcrypt'

afterAll(async () => {
  const user = await User.find({ name: 'jestユーザー' })
  user[0].remove()
})

describe('新規登録のAPIテスト', () => {
  it('ユーザー名未入力時のテスト', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: '' })
      .send({ password: 'password' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: '' })
  });

  it('パスワード未入力時のテスト', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'test' })
      .send({ password: '' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: '' })
  });

  it('パスワード8文字未満のテスト', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'test' })
      .send({ password: 'passwor' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: '' })
  });

  it('新規登録テスト', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'jestユーザー' })
      .send({ password: 'password' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'create User successfully', data: ['jestユーザー'] })
  });

  it('ユーザー名が既に存在している場合のテスト', async () => {
    const user = new User()
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync("password", salt)
    user.name = 'jest登録済みユーザー'
    user.password = hash
    await user.save()
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'jest登録済みユーザー' })
      .send({ password: 'password' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: '入力したユーザー名は既に使用されています。' })
    user.remove()
  });
});

describe('ログイン', () => {
  it('ユーザー名が違う場合', async () => {
    const user = new User()
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync("password", salt)
    user.name = 'jestログインユーザー ユーザー名'
    user.password = hash
    await user.save()
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'test' })
      .send({ password: 'password' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: 'ユーザー名もしくはパスワードが違います。' })
    user.remove()
  })

  it('パスワードが違う場合', async () => {
      const user = new User()
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync("password", salt)
      user.name = 'jestログインユーザー パスワード'
      user.password = hash
      await user.save()
      const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'jestログインユーザー パスワード' })
      .send({ password: 'testpassword' })
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ error: 'ユーザー名もしくはパスワードが違います。' })
    user.remove()
  })

  it('ログイン', async () => {
    const user = new User()
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync("password", salt)
    user.name = 'jestログインユーザー'
    user.password = hash
    await user.save()
    const res = await request(app)
    .post('/api/auth/login')
    .send({ name: 'jestログインユーザー' })
    .send({ password: 'password' })
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('token')
  user.remove()
  })
})
