import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { store } from '../app/store';
import sidebar_en from './locales/sidebar/en';
import sidebar_ar from './locales/sidebar/ar';
import signUp_en from './locales/signUp/en';
import signUp_ar from './locales/signUp/ar';

import specialprice_en from './locales/specialprice/en';
import specialprice_ar from './locales/specialprice/ar';
import roomoverview_en from './locales/roomoverview/en';
import roomoverview_ar from './locales/roomoverview/ar';
import updateroom_en from './locales/updateroom/en';
import updateroom_ar from './locales/updateroom/ar';
import updatemainimage_en from './locales/updatemainimage/en';
import updatemainimage_ar from './locales/updatemainimage/ar';
import Employee_en from './locales/Employee/en';
import Employee_ar from './locales/Employee/ar';
import addemployee_en from './locales/addemployee/en';
import addemployee_ar from './locales/addemployee/ar';
import updateemployee_en from './locales/updateemployee/en';
import updateemployee_ar from './locales/updateemployee/ar';
import EditJobModal_en from './locales/EditJobModal/en';
import EditJobModal_ar from './locales/EditJobModal/ar';

import home_en from './locales/home/en';
import home_ar from './locales/home/ar';
import roomAndBooking_en from './locales/roomAndBooking/en';
import roomAndBooking_ar from './locales/roomAndBooking/ar';
import hall_en from './locales/hall/en';
import hall_ar from './locales/hall/ar';
import about_ar from './locales/about/ar';
import about_en from './locales/about/en';
import restaurant_en from './locales/restaurant/en';
import restaurant_ar from './locales/restaurant/ar';
import profile_en from './locales/profile/en';
import profile_ar from './locales/profile/ar';

import adminBooking_en from './locales/adminBooking/en';
import adminBooking_ar from './locales/adminBooking/ar';

import halls_en from './locales/halls/en';
import halls_ar from './locales/halls/ar';


const resources = {
  en: {
    adminBooking: adminBooking_en,
    restaurant: restaurant_en,
    about: about_en,
    profile: profile_en,
    hall: hall_en,
    home: home_en,
    roomAndBooking: roomAndBooking_en,
    sidebar: sidebar_en,
    signUp: signUp_en,
    specialprice: specialprice_en,
    roomoverview: roomoverview_en,
    singleUpdateroom: updateroom_en,
    updatemainimage: updatemainimage_en,
    Employee: Employee_en,
    addemployee: addemployee_en,
    updateemployee: updateemployee_en,
    EditJobModal: EditJobModal_en,
    halls: halls_en,
    translation: {
      "companyHallMainTexts": {
        "upperSection": {
          "title": "Where work and relaxation come together",
          "description": "Hotel & Spa Resort Qasr alnkheel resort and Hotel offers well-equipped conference rooms, professional staff, and a beautiful hotel environment"
        },
        "descriptionSection": {
          "title": "For companies",
          "description": "Success of business meetings, training and conferences is a result of hard work and right decisions. One of them is a choice of a responsible hotel partner which is at the end of the day reflected in the overall rating of event, satisfaction of your clients, partners and colleagues."
        }
      },
      "familyHallMainTexts": {
        "upperSection": {
          "title": "Organize a family celebration",
          "description": "."
        },
        "descriptionSection": {
          "title": "family celebrations",
          "description": "We know how important is your event for you, whether it is a jubilee or an anniversary. Your story deserves the excellent service and beautiful environment of our Hotel & Spa Resort. Our professional team working with carefully selected suppliers will ensure that your day is exceptional."
        }
      },
      "weddingHallFeatures": {
        "elegant_design": {
          "title": "Elegant Design",
          "description": "Luxurious décor that adds a touch of sophistication to your special event."
        },
        "spacious_hall": {
          "title": "Spacious Hall",
          "description": "Large venue that comfortably accommodates a significant number of guests."
        },
        "custom_lighting": {
          "title": "Custom Lighting",
          "description": "Modern lighting systems customizable to match your event's theme and ambiance."
        },
        "high_quality_sound": {
          "title": "High-Quality Sound System",
          "description": "Excellent audio setup for weddings, speeches, and performances."
        },
        "bridal_suite": {
          "title": "Private Bridal Suite",
          "description": "Comfortable and well-equipped space for the bride to get ready before the celebration."
        },
        "air_conditioned": {
          "title": "Fully Air-Conditioned",
          "description": "Comprehensive climate control to keep guests comfortable at all times."
        },
        "decor_services": {
          "title": "Decor and Styling Services",
          "description": "Professional team to design floral arrangements and venue decoration to your taste."
        },
        "catering_options": {
          "title": "Diverse Catering Options",
          "description": "Buffet or custom menu selections to suit all preferences."
        },
        "valet_parking": {
          "title": "Valet Parking Service",
          "description": "Convenient valet service for your guests’ comfort."
        },
        "photo_areas": {
          "title": "Scenic Photo Spots",
          "description": "Dedicated areas to capture your most memorable moments."
        }
      },
      "conferenceFeatures": {
        "central_location": {
          "title": "Central Location",
          "description": "Located in the heart of the city, easily accessible by public and private transport."
        },
        "modern_equipment": {
          "title": "Modern Equipment",
          "description": "Equipped with high-quality projectors, sound systems, and lighting for professional presentations."
        },
        "flexible_seating": {
          "title": "Flexible Seating Arrangements",
          "description": "Configurable layouts including theater, classroom, U-shape, and banquet styles."
        },
        "high_speed_internet": {
          "title": "High-Speed Internet",
          "description": "Stable and fast Wi-Fi connection to support video conferencing and online collaboration."
        },
        "on_site_catering": {
          "title": "On-site Catering Services",
          "description": "Coffee breaks, snacks, and full meal options available upon request."
        },
        "event_support": {
          "title": "Dedicated Event Support Team",
          "description": "Professional staff available to assist before and during the event."
        },
        "parking": {
          "title": "Ample Parking Space",
          "description": "Secure parking area for guests and attendees."
        },
        "quiet_environment": {
          "title": "Quiet and Private Environment",
          "description": "Ideal setting for focused discussions and productive meetings."
        },
        "acoustic_design": {
          "title": "Acoustic Optimization",
          "description": "Soundproofed walls and acoustic design to ensure clear communication."
        },
        "tech_friendly": {
          "title": "Tech-Friendly Setup",
          "description": "Multiple power outlets, charging stations, and AV connectivity options."
        }
      },
      "family": {
        "title": "Family Halls",
        "subtitle": "Weddings and private celebrations",
        "description": "Elegant spaces designed for family gatherings, weddings, and memorable private parties.",
        "buttonText": "Discover Now"
      },
      "company": {
        "title": "Corporate Halls",
        "subtitle": "Conferences and business meetings",
        "description": "Professional venues ideal for company events, formal meetings, and corporate functions.",
        "buttonText": "Discover Now"
      },
      "welcome": "Welcome to our website",
      "change_language": "Change Language",
      "headerServices": "Add Service +",
      "headerAllService": "All Services",
      "headerRooms": "Add Room Type +",
      "headerTitle": "Title",
      "headerDescription": "Description",
      "headerServiceNumber": "Service number",
      "headerAction": "Action",
      "headerRoomType": "Room Type",
      "roomTable": {
        "title": "Title",
        "description": "Description",
        "roomNumber": "Room Number",
        "action": "Action"
      },
      "serviceTable": {
        "title": "Title",
        "description": "Description",
        "serviceNumber": "Service Number",
        "action": "Action"
      },
      "roomNameEnglish": "Room Name (English)",
      "roomNamearabic": "Room Name (Arabic)",
      "roomDescriptionEnglish": "Description (English)",
      "roomDescriptionArabic": "Description (Arabic)",
      "addRoomType": "Add Room Type",
      "updateRoomType": "Update Room Type",
      "adding": "Adding...",
      "newRoomType": "Add Room Type",
      "updating": "Updating...",
      "newupdateRoomType": "Update Room Type",
      "headerAddRoomService": "Add Room Service",
      "roomService": {
        "add": "Add Room Service",
        "update": "Update Room Service"
      },
      "ServiceNameEnglish": "Service Name (English)",
      "ServiceNameArabic": "Service Name (Arabic)",
      "ServiceDescriptionEnglish": "Description (English)",
      "ServiceDescriptionArabic": "Description (Arabic)",
      "ServiceImage": "Service Image",
      "all_rooms": {
        "title": "All Rooms",
        "create_new": "+ Create new",
        "no_data_error": "No rooms data received from server",
        "fetch_error": "Failed to load rooms. Please try again later.",
        "retry": "Retry",
        "room_no": "Room No",
        "category": "Category",
        "type": "Type",
        "status": "Status",
        "actions": "Actions",
        "loading": "Loading rooms...",
        "no_rooms": "No rooms available",
        "not_available": "N/A",
        "active": "Active",
        "inactive": "Inactive",
        "view_details": "View details",
        "delete": "Delete"
      },


      "createroom": {
        "title": "Create Room",
        "edit_title": "Edit Room",
        "select_default": "Select...",
        "sections": {
          "basic_info": "Basic Information",
          "category_info": "Category Information",
          "pricing": "Room Pricing",
          "amenities": "Amenities",
          "featured_image": "Featured Image",
          "additional_images": "Additional Images"
        },
        "fields": {
          "room_number": "Room Number",
          "room_type": "Room Type",
          "capacity": "Capacity",
          "room_length": "Room Length (sq ft)",
          "num_baths": "Number of Baths",
          "adult_guests": "Adult Guests",
          "child_guests": "Child Guests",
          "category_ar": "Category (Arabic)",
          "category_en": "Category (English)",
          "bed_type_ar": "Bed Type (Arabic)",
          "bed_type_en": "Bed Type (English)"
        },
        "days": {
          "monday": "Monday",
          "tuesday": "Tuesday",
          "wednesday": "Wednesday",
          "thursday": "Thursday",
          "friday": "Friday",
          "saturday": "Saturday",
          "sunday": "Sunday"
        },

        "actions": {
          "upload_featured": "Click to upload featured image",
          "upload_additional": "Click to upload additional images",
          "change_image": "Click to change image",
          "processing": "Processing...",
          "publish": "Publish Room"
        },
        "labels": {
          "recommended_size": "Recommended size: 800x600px",
          "max_images": "Max 10 images (1070x622px)",
          "images_selected": "images selected"
        },
        "validation": {
          "required": "This field is required",
          "positive": "Must be a positive number",
          "max_images": "You can upload between 1 and 10 images"
        },
        "errors": {
          "load_types": "Failed to load room types",
          "create_failed": "Failed to create room"
        }
      },

      "update_room": {
        "title": "Update Room",
        "form": {
          "labels": {
            "room_no": "Room Number",
            "type": "Room Type",
            "capacity": "Capacity",
            "room_length": "Room Length",
            "num_of_baths": "Number of Baths",
            "adult_guests": "Adult Guests",
            "child_guests": "Child Guests",
            "category_ar": "Category (Arabic)",
            "category_en": "Category (English)",
            "bed_type_ar": "Bed Type (Arabic)",
            "bed_type_en": "Bed Type (English)"
          },
          "submit": "Update"
        },
        "messages": {
          "success": "Room updated successfully!",
          "error": "Failed to update room",
          "unknown_error": "An unknown error occurred"
        }
      },
      "shared": {
        "buttons": {
          "update": "Update"
        }
      },


      "pricing": {
        "title": {
          "update": "Update Pricing"
        },
        "actions": {
          "apply_uniform": "Apply Same Price for All Days"
        },
        "success": {
          "updated": "Pricing updated successfully!"
        },
        "errors": {
          "load_failed": "Failed to load pricing data",
          "update_failed": "Failed to update pricing"
        }
      },
      "days": {
        "sunday": "Sunday",
        "monday": "Monday",
        "tuesday": "Tuesday",
        "wednesday": "Wednesday",
        "thursday": "Thursday",
        "friday": "Friday",
        "saturday": "Saturday"
      },
      "dashboard": "Dashboard",
      "currency": "SAR",
      "room": "Room"

    }
  },
  ar: {
    adminBooking: adminBooking_ar,
    restaurant: restaurant_ar,
    about: about_ar,
    profile: profile_ar,
    hall: hall_ar,
    home: home_ar,
    roomAndBooking: roomAndBooking_ar,
    sidebar: sidebar_ar,
    signUp: signUp_ar,
    specialprice: specialprice_ar,
    roomoverview: roomoverview_ar,
    singleUpdateroom: updateroom_ar,
    updatemainimage: updatemainimage_ar,
    Employee: Employee_ar,
    addemployee: addemployee_ar,
    updateemployee: updateemployee_ar,
    EditJobModal: EditJobModal_ar,
    halls_en: halls_ar,

    translation: {
      "companyHallMainTexts": {
        "upperSection": {
          "title": "حيث يلتقي العمل بالاسترخاء",
          "description": "منتجع وفندق قصر النخيل يقدم قاعات مؤتمرات مجهزة تجهيزاً جيداً، وطاقماً محترفاً، وبيئة فندقية جميلة"
        },
        "descriptionSection": {
          "title": "للشركات",
          "description": "نجاح الاجتماعات التجارية، والتدريبات، والمؤتمرات هو نتيجة للعمل الجاد واتخاذ القرارات الصحيحة. أحد هذه القرارات هو اختيار شريك فندقي مسؤول، والذي ينعكس في نهاية المطاف على التقييم العام للفعالية، ورضا عملائك، وشركائك، وزملائك."
        }
      },
      "familyHallMainTexts": {
        "upperSection": {
          "title": "نظّم احتفالاً عائلياً",
          "description": ""
        },
        "descriptionSection": {
          "title": "الاحتفالات العائلية",
          "description": "نحن نعلم مدى أهمية مناسبتك بالنسبة لك، سواء كانت يوبيلًا أو ذكرى سنوية. قصتك تستحق خدمة ممتازة وبيئة جميلة في منتجع وفندق السبا الخاص بنا. سيضمن فريقنا المحترف، بالتعاون مع موردين مختارين بعناية، أن يكون يومك استثنائيًا."
        }
      },
      "welcome": "مرحبًا بك في موقعنا",
      "change_language": "تغيير اللغة",
      "headerAllService": "جميع الخدمات",
      "headerServices": "اضافة خدمة +",
      "headerRooms": "اضافة نوع غرفة +",
      "headerAllRooms": "جميع الغرف",
      "roomTable": {
        "title": "العنوان",
        "description": "وصف الغرفة",
        "roomNumber": "رقم الغرفة",
        "action": "الإجراء"
      },
      "serviceTable": {
        "title": "العنوان",
        "description": "وصف الخدمة",
        "serviceNumber": "رقم الخدمة",
        "action": "الإجراء"
      },
      "roomNameEnglish": "اسم الغرفة (بالإنجليزية)",
      "roomNamearabic": "اسم الغرفة (بالعربية)",
      "roomDescriptionEnglish": "وصف الغرفة (بالإنجليزية)",
      "roomDescriptionArabic": "وصف الغرفة (بالعربية)",
      "addRoomType": "إضافة نوع غرفة",
      "updateRoomType": "تحديث نوع الغرفة",
      "adding": "جاري الإضافة...",
      "newRoomType": "إضافة نوع غرفة",
      "updating": "جاري التحديث...",
      "newupdateRoomType": "تحديث نوع الغرفة",
      "roomService": {
        "add": "إضافة خدمة الغرفة",
        "update": "تحديث خدمة الغرفة"
      },
      "ServiceNameEnglish": "اسم الخدمة(بالانجليزية)",
      "ServiceNameArabic": "اسم الخدمة (بالعربية)",
      "ServiceDescriptionEnglish": "وصف الخدمة(بالانجليزية)",
      "ServiceDescriptionArabic": "وصف الخدمة (بالعربية)",
      "ServiceImage": "صورة الخدمة ",
      "all_rooms": {
        "title": "جميع الغرف",
        "create_new": "+ إنشاء جديد",
        "no_data_error": "لا توجد بيانات للغرف من الخادم",
        "fetch_error": "فشل تحميل الغرف. يرجى المحاولة مرة أخرى لاحقًا.",
        "retry": "إعادة المحاولة",
        "room_no": "رقم الغرفة",
        "category": "الفئة",
        "type": "النوع",
        "status": "الحالة",
        "actions": "الإجراءات",
        "loading": "جاري تحميل الغرف...",
        "no_rooms": "لا توجد غرف متاحة",
        "not_available": "غير متاح",
        "active": "مفعل",
        "inactive": "غير مفعل",
        "view_details": "عرض التفاصيل",
        "delete": "حذف"
      },
      "createroom": {
        "title": "إنشاء غرفة",
        "edit_title": "تعديل الغرفة",
        "select_default": "اختر...",
        "sections": {
          "basic_info": "المعلومات الأساسية",
          "category_info": "معلومات الفئة",
          "pricing": "تسعير الغرفة",
          "amenities": "المرافق",
          "featured_image": "الصورة الرئيسية",
          "additional_images": "صور إضافية"
        },
        "fields": {
          "room_number": "رقم الغرفة",
          "room_type": "نوع الغرفة",
          "capacity": "السعة",
          "room_length": "طول الغرفة (قدم مربع)",
          "num_baths": "عدد الحمامات",
          "adult_guests": "ضيوف بالغين",
          "child_guests": "ضيوف أطفال",
          "category_ar": "الفئة (عربي)",
          "category_en": "الفئة (إنجليزي)",
          "bed_type_ar": "نوع السرير (عربي)",
          "bed_type_en": "نوع السرير (إنجليزي)"
        },
        "days": {
          "monday": "الإثنين",
          "tuesday": "الثلاثاء",
          "wednesday": "الأربعاء",
          "thursday": "الخميس",
          "friday": "الجمعة",
          "saturday": "السبت",
          "sunday": "الأحد"
        },
        "actions": {
          "upload_featured": "انقر لرفع الصورة الرئيسية",
          "upload_additional": "انقر لرفع صور إضافية",
          "change_image": "انقر لتغيير الصورة",
          "processing": "جاري المعالجة...",
          "publish": "نشر الغرفة"
        },
        "labels": {
          "recommended_size": "الحجم الموصى به: 800x600 بكسل",
          "max_images": "الحد الأقصى 10 صور (1070x622 بكسل)",
          "images_selected": "صور مختارة"
        },
        "validation": {
          "required": "هذا الحقل مطلوب",
          "positive": "يجب أن يكون رقم موجب",
          "max_images": "يمكنك رفع ما بين 1 إلى 10 صور"
        },
        "errors": {
          "load_types": "فشل تحميل أنواع الغرف",
          "create_failed": "فشل إنشاء الغرفة"
        },

      },
      "family": {
        "title": "القاعات العائلية",
        "subtitle": "للحفلات الخاصة والأعراس",
        "description": "مساحات أنيقة مصممة للتجمعات العائلية، الأعراس، والحفلات الخاصة التي لا تُنسى.",
        "buttonText": "استكشف الآن"
      },
      "company": {
        "title": "قاعات المناسبات والشركات",
        "subtitle": "للاجتماعات والمؤتمرات",
        "description": "أماكن احترافية مثالية للفعاليات الرسمية، اجتماعات العمل، والمناسبات الخاصة بالشركات.",
        "buttonText": "استكشف الآن"
      },
      "weddingHallFeatures": {
        "elegant_design": {
          "title": "تصميم راقٍ",
          "description": "ديكور فاخر يضفي لمسة من الأناقة على مناسبتك الخاصة."
        },
        "spacious_hall": {
          "title": "قاعة واسعة",
          "description": "مساحة كبيرة تستوعب عددًا كبيرًا من الضيوف بشكل مريح."
        },
        "custom_lighting": {
          "title": "إضاءة مخصصة",
          "description": "أنظمة إضاءة حديثة قابلة للتخصيص حسب نوع الحفل وأجوائه."
        },
        "high_quality_sound": {
          "title": "نظام صوتي عالي الجودة",
          "description": "تجربة صوتية ممتازة لحفلات الزفاف والخطب والعروض."
        },
        "bridal_suite": {
          "title": "جناح خاص للعروس",
          "description": "مكان مريح ومجهز للعروس للاستعداد قبل الحفل."
        },
        "air_conditioned": {
          "title": "مكيّفة بالكامل",
          "description": "نظام تكييف متكامل يضمن راحة الضيوف في جميع الأوقات."
        },
        "decor_services": {
          "title": "خدمات تنسيق وتزيين",
          "description": "فريق متخصص لتنسيق الأزهار وتزيين القاعة حسب ذوقك."
        },
        "catering_options": {
          "title": "خيارات ضيافة متنوعة",
          "description": "بوفيه مفتوح أو قوائم مخصصة لتلائم جميع الأذواق."
        },
        "valet_parking": {
          "title": "خدمة صف السيارات",
          "description": "راحة لضيوفك مع خدمة صف السيارات الاحترافية."
        },
        "photo_areas": {
          "title": "زوايا تصوير مميزة",
          "description": "مواقع مخصصة لالتقاط أجمل الذكريات."
        }
      },
      //updateroom

      "pricing": {
        "title": {
          "update": "تحديث الأسعار"
        },
        "actions": {
          "apply_uniform": "تطبيق نفس السعر لجميع الأيام"
        },
        "success": {
          "updated": "تم تحديث الأسعار بنجاح!"
        },
        "errors": {
          "load_failed": "فشل تحميل بيانات الأسعار",
          "update_failed": "فشل تحديث الأسعار"
        },
        "current_type": "نوع الغرفة"
      },
      "days": {
        "sunday": "الأحد",
        "monday": "الإثنين",
        "tuesday": "الثلاثاء",
        "wednesday": "الأربعاء",
        "thursday": "الخميس",
        "friday": "الجمعة",
        "saturday": "السبت"
      },
      "currency": "ر.س",
      "room": "غرفة",
      "validation": {
        "required": "هذا الحقل مطلوب",
        "min_value": "يجب أن تكون القيمة على الأقل {min}",
        "max_value": "يجب أن تكون القيمة على الأكثر {max}",
        "positive": "يجب أن تكون القيمة موجبة"
      },
      "actions": {
        "reset": "إعادة تعيين",
        "update": "تحديث",
        "updating": "جاري التحديث...",
        "cancel": "إلغاء"
      },
      "loading": "جاري التحميل...",
      "conferenceFeatures": {
        "central_location": {
          "title": "موقع مركزي",
          "description": "يقع في قلب المدينة، ويمكن الوصول إليه بسهولة عبر وسائل النقل العامة والخاصة."
        },
        "modern_equipment": {
          "title": "معدات حديثة",
          "description": "مزود بأجهزة عرض وصوت وإضاءة عالية الجودة للعروض التقديمية الاحترافية."
        },
        "flexible_seating": {
          "title": "ترتيب مقاعد مرن",
          "description": "ترتيبات متنوعة تشمل النمط المسرحي، الفصلي، شكل U، ونمط الولائم."
        },
        "high_speed_internet": {
          "title": "إنترنت عالي السرعة",
          "description": "اتصال Wi-Fi سريع ومستقر لدعم الاجتماعات عبر الإنترنت والتعاون الرقمي."
        },
        "on_site_catering": {
          "title": "خدمات تموين داخلية",
          "description": "استراحات قهوة ووجبات خفيفة وخيارات وجبات كاملة متاحة حسب الطلب."
        },
        "event_support": {
          "title": "فريق دعم فعاليات مخصص",
          "description": "طاقم احترافي متوفر لتقديم الدعم قبل وأثناء الفعالية."
        },
        "parking": {
          "title": "مواقف سيارات واسعة",
          "description": "منطقة مواقف آمنة للضيوف والحضور."
        },
        "quiet_environment": {
          "title": "بيئة هادئة وخاصة",
          "description": "مكان مثالي للنقاشات المركزة والاجتماعات المثمرة."
        },
        "acoustic_design": {
          "title": "عزل صوتي مثالي",
          "description": "جدران عازلة للصوت وتصميم صوتي لضمان وضوح التواصل."
        },
        "tech_friendly": {
          "title": "تجهيز تقني متكامل",
          "description": "منافذ كهربائية متعددة، محطات شحن، وخيارات اتصال صوتي ومرئي."
        }
      },
      "dashboard": "لوحة التحكم"
    }
  }
};
const currentLang = store.getState().language.lang;
// تهيئة i18n
i18n
  .use(LanguageDetector) // لاكتشاف لغة المستخدم تلقائيًا
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: currentLang,
    interpolation: {
      escapeValue: false
    }
  });


store.subscribe(() => {
  const newLang = store.getState().language.lang;
  if (i18n.language !== newLang) {
    i18n.changeLanguage(newLang);
  }
});

export default i18n;
