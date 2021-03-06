// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const routes = {
  base: 'http://localhost:3001/api', //?size=9&page=0&title=eee
  register: '/user/register',
  login: '/user/login',
  logout: '/user/logout',
  token: '/user/token',
  //---------GASTOS---------------
  getAllGastos:'/gasto',
  getGasto:'/gasto/', //:gastoID
  createGasto:'/gasto',

  //---------SOCIOS---------------
  getAllSocios: '/socio',

  //---------PARCELAS-------------
  getParcelasOfSocio: '/parcelas/',

  //---------CULTIVOS-------------
  getCultivosOfParcela: '/cultivos/',

  //---------CENTROS--------------
  getAllCentros: '/centro'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
