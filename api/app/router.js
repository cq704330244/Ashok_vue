'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.post('/login', controller.login.index)
  router.post('/sign', controller.sign.index)
  router.post('/home/tablistQuery', controller.tablist.index)
}
