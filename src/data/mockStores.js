// src/data/mockStores.js

export const stores = [
  {
    id: 102,
    name: '아침의 빵집',
    address: '서울특별시 서대문구 연희로 11길 22',
    phone: '02-333-4567',
    openTime: '07:30',
    closeTime: '20:00',
    isOpen: true,
    category: '베이커리',
    thumbnailImage:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMDhfMjc4%2FMDAxNzAyMDAzMjM1MDA3.RprkGcrwev0xQyWg4A1c9dR6He6DnGJeIgScrIExCEEg.rN67vNRIozDJw8oIP9p1QhYbrqf0nsKehxLiOTjdwrwg.JPEG.de613%2F11.jpg&type=sc960_832',
    galleryImages: [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMjFfMjI1%2FMDAxNzA4NDkwOTAwMTYw.Pu4c4xucRY87q0S-ht3ySVLNEZHBhsNlrKcGTgoPUokg.Xq56vhUCSApKyl00vXSXindA0RbfuCT6hMCHeuJyoTQg.JPEG%2FDSC07193.jpg&type=a340',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODExMDJfNTkg%2FMDAxNTQxMTQzMjYwNTMx.p0-z5QxC8IGo4AfvJFY2fZiB-LX-OfWbWyFbLp6UUoIg.EprKgUKPkRJ8rvSAAl4z_8zr-yMum_yQSV4MTaWaC8Mg.JPEG.paikmh77%2F%25C0%25CE%25B4%25F5%25BD%25BA%25C6%25AE%25B8%25AE%25BE%25F3%25C4%25AB%25C6%25E4%25C0%25CE%25C5%25D7%25B8%25AE%25BE%25EE%25BC%25F6%25B3%25BB%25B9%25D9%25C0%25CC%25BF%25C3%25B6%25F3_%252888%2529.jpg&type=a340',
    ],
    allergyInfo: ['밀', '계란', '우유'],
    menu: [
      {
        menuId: 1,
        name: '소금빵',
        price: 3800,
        isPopular: true,
        imageUrl:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMTJfNzQg%2FMDAxNjc4NjMwNTcxNDg1.MKUUvgI_v-2yfvVL3iwfuzKqKiswl2zXV3Shc_i0Oywg.-2UlnK0i7_OmTX_sdpk53bMnDqPJaH0_TwbV5Hx2pBQg.JPEG.leejjjwww5360%2FIMG_4851.jpg&type=a340',
      },
      {
        menuId: 2,
        name: '크루아상',
        price: 4200,
        isPopular: true,
        imageUrl:
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Ffresh-french-croissant-table_140725-5650.jpg&type=a340',
      },
    ],
    coupon: {
      id: 56,
      description: '1만원 이상 구매 시 소금빵 1개 무료',
      expiryDate: '2025-09-30',
      isAvailable: true,
    },
    qrShareUrl: 'https://example.com/bakery/102',
    phoneShareNumber: '010-1111-2222',
    reviewSummary: {
      averageRating: 4.8,
      totalReviews: 256,
    },
    location: {
      latitude: 37.569183,
      longitude: 126.938831,
    },
  },
  {
    id: 103,
    name: '브런치 테이블',
    address: '서울특별시 강남구 테헤란로 5길 11',
    phone: '02-555-9876',
    openTime: '09:00',
    closeTime: '18:00',
    isOpen: true,
    category: '브런치',
    thumbnailImage:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzExMThfMTE4%2FMDAxNzAwMjg3OTI2MjM1.M5DLAiRdFENnA1QIZYRUpxLFoL37zeaSjLFbFy40UTgg.Hp1blPqJdqg6Qv_0JWH_ZpeeZUjjt1pIqAYjP_427Ksg.JPEG.p1000kr%2F%25BF%25C2%25B1%25B8%25B8%25A71.jpg&type=sc960_832',
    galleryImages: [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MzBfMTIz%2FMDAxNTY3MTM1MTYwMTI2.lzOIQrl-hhGWweOwDgUcCuXMFRWRqtVcFVPZcFlTfrwg.UokedMoQ1ZJ6pFvC1VS7ikbG1mNvmLpKFWNJY66A6CYg.JPEG.ecopiagp%2F%25C7%25C3%25B7%25CE%25B7%25B9_12.jpg&type=a340',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDZfMjE4%2FMDAxNjQ5MjUyNjIxMTMw.Q-FejTwYloSW8hnamEp9dVNS5GmmiaiFegmvo_Xr9cIg.gU2BJpl8lB06pZ55-u4gU-9aX30QW2jyHiFGwuvzeSIg.JPEG.cubelup504%2FIMG_4968.jpg&type=a340',
    ],
    allergyInfo: ['계란', '토마토', '밀'],
    menu: [
      {
        menuId: 1,
        name: '에그 베네딕트',
        price: 18000,
        isPopular: true,
        imageUrl:
          'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn.crowdpic.net%2Fdetail-thumb%2Fthumb_d_7A91342D0859BA21A05B907FF2F88562.jpg&type=a340',
      },
      {
        menuId: 2,
        name: '아보카도 토스트',
        price: 16500,
        isPopular: false,
        imageUrl:
          'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MjlfMzMg%2FMDAxNzE5NjY4NjgwMTEw.MHWlOPjkPuEcSNvKDukp-J0WDEhpQHZ1DF9fiCIFC-kg.JFwakMT7-Euhjjq9jxphXd6uKFn2FXPQjFZgwmhkVKYg.JPEG%2FIMG_3676.jpg&type=a340',
      },
    ],
    coupon: {
      id: 57,
      description: '브런치 세트 20% 할인',
      expiryDate: '2025-08-20',
      isAvailable: true,
    },
    qrShareUrl: 'https://example.com/brunch/103',
    phoneShareNumber: '010-3333-4444',
    reviewSummary: {
      averageRating: 4.6,
      totalReviews: 98,
    },
    location: {
      latitude: 37.498112,
      longitude: 127.027613,
    },
  },
];
