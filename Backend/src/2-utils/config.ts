class Config {
  public isDevelopment = process.env.NODE_ENV === 'development'
  public isProduction = process.env.NODE_ENV === 'production'
  public port = 0
  public sqlHost = 'localhost'
  public sqlUser = 'root'
  public sqlPassword = ''
  public sqlDatabase = 'travel'
}

class DevelopmentConfig extends Config {
  public port = 3001
  public sqlHost = 'localhost'
  public sqlUser = 'root'
  public sqlPassword = ''
  public sqlDatabase = 'travel' // Database Name
}

class ProductionConfig extends Config {
  public port = +process.env.PORT
  public sqlHost = 'localhost'
  public sqlUser = 'root'
  public sqlPassword = ''
  public sqlDatabase = 'travel'
}

const config =
  process.env.NODE_ENV === 'production'
    ? new ProductionConfig()
    : new DevelopmentConfig()

export default config
