import axios from 'axios';

const apiClient = axios.create({
   baseURL: 'http://evr.bjst.uz',
   withCredentials: false,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'uz'
   }
}
);

export default {
   getSetting(lang) {
      return apiClient.get('/api/setting/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getLatestNews(lang) {
      return apiClient.get('/api/news/last-news', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getNewsData(lang, slug, visitor) {
      return apiClient.post('/api/news/news-detail/', {
         headers: {
            'Accept-Language': lang
         },
         slug,
         person: visitor
      })
   },
   getNewsDataById(lang, id) {
      return apiClient.post('/api/news/news-detail-telegram/', {
         headers: {
            'Accept-Language': lang
         },
         id
      })
   },
   getTagNewsData(lang, tag) {
      return apiClient.get(`/api/news/list/?tag=${tag}`, {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getSocialItem(lang) {
      return apiClient.get('/api/networks/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getTopNews(lang) {
      return apiClient.get('/api/corusel/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getMenuItems(lang) {
      return apiClient.get('/api/category/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getGroupNews(lang) {
      return apiClient.get('/api/news/society', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getAds(lang) {
      return apiClient.get('/api/ads/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getSpecialNews(lang) {
      return apiClient.get('/api/news/reade-more', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getInterviews(lang) {
      return apiClient.get('/api/news/interview', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getAboutData(lang) {
      return apiClient.get('/api/about', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getFaq(lang) {
      return apiClient.get('/api/faq/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   getTerms(lang) {
      return apiClient.get('/api/terms/index', {
         headers: {
            'Accept-Language': lang
         }
      })
   },
   postSearch(search) {
      return apiClient.post('/api/news/search', {
         search
      }
      )
   },
}