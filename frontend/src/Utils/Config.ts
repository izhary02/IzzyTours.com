class Config {
  public supportEmail = 'support@travel.com'
  public supportPhone = '031234567'
  public supportPage = ''
  public registerUrl = ''
  public loginUrl = ''
  public locationsUrl = ''
  public locationForFollowersUrl = ''
  public locationsDetailsUrl = ''
  public locationsEditUrl = ''
  public locationImagesUrl = ''
  public followersUrl = ''
  public usersFollowersUrl = ''
  public usersUrl = ''
}

class DevelopmentConfig extends Config {
  public supportEmail = 'support@travel.com'
  public supportPhone = '031234567'
  public supportPage = 'http://localhost:3001/travel.com/it-support/'
  public registerUrl = 'http://localhost:3001/api/auth/register/'
  public loginUrl = 'http://localhost:3001/api/auth/login/'
  public locationsUrl = 'http://localhost:3001/api/locations/'
  public locationForFollowersUrl = 'http://localhost:3001/api/location/'
  public locationsDetailsUrl = 'http://localhost:3001/api/locations/details/'
  public locationsEditUrl = 'http://localhost:3001/api/locations/edit/'
  public locationImagesUrl = 'http://localhost:3001/api/locations/images/'
  public followersUrl = 'http://localhost:3001/api/follower/'
  public usersFollowersUrl =
    'http://localhost:3001/api/follower/amountFollower/'
  public usersUrl = 'http://localhost:3001/api/users/'
}

class ProductionConfig extends Config {
  public supportEmail = 'support@travel.com'
  public supportPhone = '031234567'
  public supportPage = 'http://localhost:3001/travel.com/support/'
  public registerUrl = 'http://localhost:3001/api/auth/register/'
  public loginUrl = 'http://localhost:3001/api/auth/login/'
  public locationsUrl = 'http://localhost:3001/api/locations/'
  public locationForFollowersUrl = 'http://localhost:3001/api/location/'
  public locationsDetailsUrl = 'http://localhost:3001/api/locations/details/'
  public locationsEditUrl = 'http://localhost:3001/api/locations/edit/'
  public locationImagesUrl = 'http://localhost:3001/api/locations/images/'
  public followersUrl = 'http://localhost:3001/api/follower/'
  public usersFollowersUrl =
    'http://localhost:3001/api/follower/amountFollower/'
  public usersUrl = 'http://localhost:3001/api/users/'
}

const config =
  process.env.NODE_ENV === 'production'
    ? new ProductionConfig()
    : new DevelopmentConfig()

export default config
