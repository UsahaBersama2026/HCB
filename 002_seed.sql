-- Isi 18 produk awal. ON CONFLICT DO NOTHING mempertahankan perubahan yang sudah ada.
begin;
insert into public.hcb_settings (id,name,whatsapp,address,hours,announcement,hero_title,hero_description,about)
select id,name,whatsapp,address,hours,announcement,hero_title,hero_description,about from jsonb_populate_record(null::public.hcb_settings, $hcb${"id": 1, "name": "Toko HCB — Herbal Cageur Bageur", "whatsapp": "", "address": "", "hours": "", "announcement": "Selamat datang di Toko HCB", "hero_title": "Belanja herbal, di Toko HCB.", "hero_description": "Jelajahi produk merek GM, dari kapsul, madu, dan teh hingga perawatan serta aksesori.", "about": "Toko HCB menjual produk herbal, perawatan, dan aksesori dari merek GM. Kami berfokus pada penjualan serta pelayanan pemesanan. Produk berasal dari merek atau produsen masing-masing; Toko HCB berperan sebagai penjual."}$hcb$::jsonb)
on conflict (id) do nothing;

insert into public.hcb_products (id,name,category,label,price,description,source,image,frame,active,unit,brand,price_type,sort_order)
select id,name,category,label,price,description,source,image,frame,active,unit,brand,price_type,sort_order from jsonb_populate_recordset(null::public.hcb_products, $hcb$[
  {
    "id": "a-kapsul",
    "name": "GM A Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Produk herbal merek GM dalam bentuk kapsul.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/a-kapsul-salin/",
    "image": "assets/foto/customer-a-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        1088
      ],
      "crop": [
        40,
        410,
        460,
        615
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 1
  },
  {
    "id": "b-kapsul",
    "name": "GM B Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Varian B dalam rangkaian kapsul herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/b-kapsul/",
    "image": "assets/foto/customer-b-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        1069
      ],
      "crop": [
        350,
        460,
        365,
        495
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 2
  },
  {
    "id": "c-kapsul",
    "name": "GM C Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Varian C dalam rangkaian kapsul herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/c-kapsul/",
    "image": "assets/foto/customer-c-kapsul.jpg",
    "frame": {
      "size": [
        1080,
        958
      ],
      "crop": [
        15,
        370,
        450,
        580
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 3
  },
  {
    "id": "gm-max",
    "name": "GM Max Kapsul",
    "category": "herbal",
    "label": "Kapsul",
    "price": 300000,
    "description": "Produk kapsul GM Max dalam kemasan kotak.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gm-max-kapsul/",
    "image": "assets/foto/customer-gm-max.jpg",
    "frame": {
      "size": [
        1080,
        1077
      ],
      "crop": [
        382,
        488,
        316,
        493
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 4
  },
  {
    "id": "rpgm",
    "name": "Madu RPGM",
    "category": "herbal",
    "label": "Madu",
    "price": 250000,
    "description": "Produk madu RPGM dalam kemasan botol.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/rpgm/",
    "image": "assets/foto/customer-rpgm.jpg",
    "frame": {
      "size": [
        1080,
        1024
      ],
      "crop": [
        530,
        185,
        528,
        720
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 5
  },
  {
    "id": "gm-oil",
    "name": "GM Oil",
    "category": "minyak",
    "label": "Minyak",
    "price": 250000,
    "description": "Minyak oles merek GM untuk pemakaian luar.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gm-oil/",
    "image": "assets/foto/customer-gm-oil.jpg",
    "frame": {
      "size": [
        522,
        816
      ],
      "crop": [
        106,
        175,
        310,
        300
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 6
  },
  {
    "id": "c-powder",
    "name": "C Powder GM",
    "category": "herbal",
    "label": "Serbuk",
    "price": 250000,
    "description": "Produk herbal serbuk C Powder merek GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/c-powder/",
    "image": "assets/foto/customer-c-powder.jpg",
    "frame": {
      "size": [
        720,
        1280
      ],
      "crop": [
        55,
        290,
        610,
        419
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 7
  },
  {
    "id": "teh-bmt",
    "name": "Teh Hijau BMT GM",
    "category": "herbal",
    "label": "Teh",
    "price": 150000,
    "description": "Teh hijau BMT GM dalam kemasan pouch.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/teh-hijau-bmt/",
    "image": "assets/foto/customer-teh-bmt.jpg",
    "frame": {
      "size": [
        522,
        816
      ],
      "crop": [
        80,
        178,
        360,
        335
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 8
  },
  {
    "id": "gurah-tht",
    "name": "Gurah THT GM",
    "category": "perawatan",
    "label": "Perawatan",
    "price": 200000,
    "description": "Varian perawatan THT dari rangkaian produk GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gurah-tht-gm/",
    "image": "assets/foto/gurah-tht.png",
    "frame": {
      "size": [
        500,
        500
      ],
      "crop": [
        128,
        65,
        242,
        385
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 9
  },
  {
    "id": "vitamax",
    "name": "Vitamax GM",
    "category": "herbal",
    "label": "Herbal",
    "price": 200000,
    "description": "Varian Vitamax dalam rangkaian herbal GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/vitamax-gm/",
    "image": "assets/foto/vitamax.png",
    "frame": {
      "size": [
        454,
        449
      ],
      "crop": [
        188,
        286,
        210,
        138
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 10
  },
  {
    "id": "spoon",
    "name": "Spoon GM",
    "category": "perawatan",
    "label": "Alat pijat",
    "price": 200000,
    "description": "Alat bantu pijat berbahan kuningan dari GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/spoon-gm/",
    "image": "assets/foto/spoon.png",
    "frame": {
      "size": [
        640,
        640
      ],
      "crop": [
        368,
        355,
        180,
        170
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 11
  },
  {
    "id": "godogan",
    "name": "Godogan GM",
    "category": "herbal",
    "label": "Ramuan luar",
    "price": 250000,
    "description": "Ramuan rempah GM untuk pemakaian luar.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/godogan-gm/",
    "image": "assets/foto/godogan.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        76,
        202,
        280,
        335
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 12
  },
  {
    "id": "hexa",
    "name": "Hexa GM",
    "category": "herbal",
    "label": "Air mineral",
    "unit": "dus",
    "price": 300000,
    "description": "Air mineral dalam botol. Harga acuan per dus.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/hexa-gm/",
    "image": "assets/foto/hexa.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        80,
        162,
        270,
        488
      ]
    },
    "active": true,
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 13
  },
  {
    "id": "gms-2",
    "name": "GMS 2",
    "category": "herbal",
    "label": "Minuman",
    "price": 250000,
    "description": "Minuman herbal dalam botol dari rangkaian GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/gms-2/",
    "image": "assets/foto/gms-2.png",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        98,
        158,
        228,
        382
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 14
  },
  {
    "id": "skincare",
    "name": "Skincare GM",
    "category": "perawatan",
    "label": "Skincare",
    "price": 450000,
    "description": "Rangkaian produk perawatan kulit merek GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/skincare-gm/",
    "image": "assets/foto/skincare.png",
    "frame": {
      "size": [
        640,
        640
      ],
      "crop": [
        0,
        0,
        640,
        548
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 15
  },
  {
    "id": "gm-feeling",
    "name": "GM Feeling",
    "category": "perawatan",
    "label": "Perawatan",
    "price": null,
    "description": "Produk perawatan kulit GM dalam kemasan pot.",
    "source": null,
    "image": "assets/foto/customer-gm-feeling.jpg",
    "frame": {
      "size": [
        813,
        1280
      ],
      "crop": [
        500,
        1120,
        300,
        160
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 16
  },
  {
    "id": "magic-ring",
    "name": "Magic Ring GM",
    "category": "aksesori",
    "label": "Aksesori",
    "price": 250000,
    "description": "Aksesori berbentuk cincin dari rangkaian GM.",
    "source": "https://pgrj.gusmusraksajasad.com/produk/magic-ring-gm/",
    "image": "assets/foto/customer-magic-ring.jpg",
    "frame": {
      "size": [
        720,
        720
      ],
      "crop": [
        270,
        175,
        450,
        440
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 17
  },
  {
    "id": "energy-pendan",
    "name": "Energy Pendan GM",
    "category": "aksesori",
    "label": "Aksesori",
    "price": null,
    "description": "Aksesori kalung GM dengan liontin dan tali.",
    "source": null,
    "image": "assets/foto/customer-energy-pendan.jpg",
    "frame": {
      "size": [
        1080,
        1058
      ],
      "crop": [
        15,
        50,
        620,
        685
      ]
    },
    "active": true,
    "unit": "",
    "brand": "GM",
    "price_type": "reference",
    "sort_order": 18
  }
]$hcb$::jsonb)
on conflict (id) do nothing;
commit;
