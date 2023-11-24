export enum AppRoute {
  Main = '/',
  NotFound = '*',
}

export enum NameSpace {
  FindUserForm = 'FIND_USER_FORM',
  User = 'USER',
}

export enum Action {
  FetchFindUserFormData = 'data/fetchFindUserFormData',
  RedirectToRoute = 'app/redirectToRoute'
}

export enum APIRoute {
  Users = 'api/users'
}
