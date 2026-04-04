// scripts/seedVocabulary.js
// รัน: node scripts/seedVocabulary.js
// ตั้งค่า FIREBASE_SERVICE_ACCOUNT_KEY_PATH หรือ GOOGLE_APPLICATION_CREDENTIALS
// ให้ชี้ไปยัง service account key ที่เก็บไว้นอก repo

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { resolve } from "path";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH || process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY_PATH or GOOGLE_APPLICATION_CREDENTIALS.");
}

const serviceAccount = JSON.parse(readFileSync(resolve(serviceAccountPath), "utf8"));
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const vocabulary = [

  // ══════════════════════════════════════════════════════
  //  DAILY LIFE  ☀️  (55 words)
  // ══════════════════════════════════════════════════════
  { word:"greet",        phonetic:"/ɡriːt/",        meaning:"ทักทาย",                          example:"She greeted her neighbors every morning.",                     category:"daily", level:"A1" },
  { word:"wake up",      phonetic:"/weɪk ʌp/",      meaning:"ตื่นนอน",                         example:"I wake up at 6 AM every day.",                                 category:"daily", level:"A1" },
  { word:"breakfast",    phonetic:"/ˈbrekfəst/",    meaning:"อาหารเช้า",                       example:"He never skips breakfast.",                                    category:"daily", level:"A1" },
  { word:"neighbor",     phonetic:"/ˈneɪbə/",       meaning:"เพื่อนบ้าน",                      example:"My neighbor is very friendly.",                                category:"daily", level:"A1" },
  { word:"grocery",      phonetic:"/ˈɡrəʊsəri/",   meaning:"ร้านขายของชำ / สินค้าของชำ",       example:"She went to buy groceries after work.",                        category:"daily", level:"A1" },
  { word:"cook",         phonetic:"/kʊk/",          meaning:"ทำอาหาร",                         example:"He loves to cook Italian food.",                               category:"daily", level:"A1" },
  { word:"clean",        phonetic:"/kliːn/",        meaning:"ทำความสะอาด",                     example:"She cleans the house every weekend.",                          category:"daily", level:"A1" },
  { word:"laundry",      phonetic:"/ˈlɔːndri/",    meaning:"การซักผ้า",                        example:"I do laundry on Sundays.",                                     category:"daily", level:"A1" },
  { word:"sleep",        phonetic:"/sliːp/",        meaning:"นอนหลับ",                         example:"Adults need at least 7 hours of sleep.",                       category:"daily", level:"A1" },
  { word:"exercise",     phonetic:"/ˈeksəsaɪz/",   meaning:"ออกกำลังกาย",                     example:"She exercises every morning in the park.",                     category:"daily", level:"A1" },
  { word:"purchase",     phonetic:"/ˈpɜːtʃəs/",    meaning:"ซื้อ / การซื้อ",                  example:"He made a purchase at the local market.",                      category:"daily", level:"A2" },
  { word:"routine",      phonetic:"/ruːˈtiːn/",     meaning:"กิจวัตรประจำวัน",                 example:"Exercise became part of her daily routine.",                   category:"daily", level:"A2" },
  { word:"appointment",  phonetic:"/əˈpɔɪntmənt/", meaning:"การนัดหมาย",                      example:"Don't forget your dentist appointment tomorrow.",               category:"daily", level:"A2" },
  { word:"receipt",      phonetic:"/rɪˈsiːt/",     meaning:"ใบเสร็จ",                         example:"Keep the receipt in case you need to return it.",              category:"daily", level:"A2" },
  { word:"queue",        phonetic:"/kjuː/",         meaning:"คิว / รอคิว",                    example:"We stood in a long queue at the post office.",                 category:"daily", level:"A2" },
  { word:"spare time",   phonetic:"/speə taɪm/",   meaning:"เวลาว่าง",                        example:"He reads novels in his spare time.",                           category:"daily", level:"A2" },
  { word:"takeaway",     phonetic:"/ˈteɪkəweɪ/",   meaning:"อาหารซื้อกลับบ้าน",               example:"Let's order a takeaway tonight.",                              category:"daily", level:"A2" },
  { word:"schedule",     phonetic:"/ˈʃedjuːl/",    meaning:"ตารางเวลา",                       example:"Her schedule is packed with meetings.",                        category:"daily", level:"A2" },
  { word:"commute",      phonetic:"/kəˈmjuːt/",    meaning:"เดินทางไปทำงานประจำ",              example:"She commutes to work by train every day.",                     category:"daily", level:"B1" },
  { word:"errand",       phonetic:"/ˈerənd/",      meaning:"ธุระที่ต้องไปทำ",                 example:"I need to run a few errands before dinner.",                   category:"daily", level:"B1" },
  { word:"budget",       phonetic:"/ˈbʌdʒɪt/",    meaning:"งบประมาณ",                        example:"They set a strict budget for groceries.",                      category:"daily", level:"B1" },
  { word:"appliance",    phonetic:"/əˈplaɪəns/",   meaning:"เครื่องใช้ไฟฟ้า",                  example:"The kitchen appliance broke down unexpectedly.",               category:"daily", level:"B1" },
  { word:"renovate",     phonetic:"/ˈrenəveɪt/",   meaning:"ปรับปรุงซ่อมแซม",                 example:"They plan to renovate the kitchen next year.",                 category:"daily", level:"B1" },
  { word:"landlord",     phonetic:"/ˈlændlɔːd/",   meaning:"เจ้าของบ้านเช่า",                 example:"The landlord raised the rent by 10%.",                         category:"daily", level:"B1" },
  { word:"mortgage",     phonetic:"/ˈmɔːɡɪdʒ/",   meaning:"สินเชื่อบ้าน",                    example:"They took out a mortgage to buy the house.",                   category:"daily", level:"B1" },
  { word:"utility bill", phonetic:"/juːˈtɪlɪti bɪl/",meaning:"ค่าสาธารณูปโภค",              example:"Remember to pay the utility bill before the due date.",         category:"daily", level:"B1" },
  { word:"subscription", phonetic:"/səbˈskrɪpʃən/",meaning:"การสมัครสมาชิก",                  example:"He cancelled his streaming subscription.",                    category:"daily", level:"B1" },
  { word:"secondhand",   phonetic:"/ˌsekəndˈhænd/",meaning:"มือสอง",                         example:"She bought a secondhand bicycle online.",                      category:"daily", level:"B1" },
  { word:"declutter",    phonetic:"/ˌdiːˈklʌtə/",  meaning:"จัดระเบียบ / ทิ้งสิ่งที่ไม่จำเป็น",example:"She decided to declutter her entire wardrobe.",              category:"daily", level:"B2" },
  { word:"dwelling",     phonetic:"/ˈdwelɪŋ/",    meaning:"ที่อยู่อาศัย",                    example:"They found a comfortable dwelling near the park.",             category:"daily", level:"B2" },
  { word:"amenity",      phonetic:"/əˈmenɪti/",    meaning:"สิ่งอำนวยความสะดวก",              example:"The apartment has great amenities including a gym.",           category:"daily", level:"B2" },
  { word:"minimalist",   phonetic:"/ˈmɪnɪməlɪst/", meaning:"นิยมความเรียบง่าย",               example:"He lives a minimalist lifestyle with few possessions.",        category:"daily", level:"B2" },
  { word:"sustainable",  phonetic:"/səˈsteɪnəbəl/",meaning:"ยั่งยืน / เป็นมิตรกับสิ่งแวดล้อม",example:"She tries to make sustainable choices daily.",                category:"daily", level:"B2" },
  { word:"frugal",       phonetic:"/ˈfruːɡəl/",    meaning:"ประหยัด / มัธยัสถ์",              example:"Living frugally helped her save money quickly.",               category:"daily", level:"C1" },
  { word:"mundane",      phonetic:"/mʌnˈdeɪn/",    meaning:"ธรรมดา / น่าเบื่อ",               example:"He found mundane tasks surprisingly satisfying.",              category:"daily", level:"C1" },
  { word:"habitual",     phonetic:"/həˈbɪtʃuəl/",  meaning:"เป็นนิสัย",                       example:"Her habitual lateness frustrated her colleagues.",             category:"daily", level:"C1" },
  { word:"indispensable",phonetic:"/ˌɪndɪˈspensəbəl/",meaning:"ขาดไม่ได้",                  example:"A smartphone has become indispensable in modern life.",        category:"daily", level:"C1" },
  { word:"procrastinate",phonetic:"/prəˈkræstɪneɪt/",meaning:"ผัดวันประกันพรุ่ง",             example:"Stop procrastinating and finish your work.",                   category:"daily", level:"C1" },
  { word:"meticulous",   phonetic:"/mɪˈtɪkjʊləs/", meaning:"ละเอียดรอบคอบ",                  example:"She is meticulous about keeping her home clean.",              category:"daily", level:"C1" },
  { word:"convivial",    phonetic:"/kənˈvɪviəl/",  meaning:"ร่าเริง / มีมิตรไมตรี",            example:"The convivial atmosphere made everyone feel welcome.",         category:"daily", level:"C2" },
  { word:"quotidian",    phonetic:"/kwɒˈtɪdiən/",  meaning:"ประจำวัน / ธรรมดาสามัญ",          example:"She found beauty in the quotidian rhythm of life.",            category:"daily", level:"C2" },
  { word:"thrifty",      phonetic:"/ˈθrɪfti/",     meaning:"ใช้จ่ายอย่างประหยัด",             example:"Being thrifty helped them save for a vacation.",              category:"daily", level:"B1" },
  { word:"commute",      phonetic:"/kəˈmjuːt/",    meaning:"เดินทางไปกลับที่ทำงาน",           example:"Long commutes can cause a lot of stress.",                     category:"daily", level:"B1" },
  { word:"chore",        phonetic:"/tʃɔː/",        meaning:"งานบ้าน",                         example:"Washing dishes is her least favorite chore.",                  category:"daily", level:"A2" },
  { word:"pantry",       phonetic:"/ˈpæntri/",     meaning:"ห้องเก็บอาหาร",                   example:"She stocked the pantry with canned goods.",                   category:"daily", level:"B1" },
  { word:"clutter",      phonetic:"/ˈklʌtə/",      meaning:"ของรกรุงรัง",                     example:"He cleared the clutter from his desk.",                        category:"daily", level:"B1" },
  { word:"savvy",        phonetic:"/ˈsævi/",       meaning:"เชี่ยวชาญ / ฉลาดปราดเปรื่อง",     example:"She is very savvy about saving money.",                        category:"daily", level:"B2" },
  { word:"splurge",      phonetic:"/splɜːdʒ/",     meaning:"ใช้เงินฟุ่มเฟือย",                example:"He splurged on a fancy dinner for their anniversary.",          category:"daily", level:"B2" },
  { word:"ponder",       phonetic:"/ˈpɒndə/",      meaning:"ครุ่นคิด",                        example:"She pondered her decision for days.",                          category:"daily", level:"C1" },
  { word:"lethargic",    phonetic:"/ləˈθɑːdʒɪk/",  meaning:"เซื่องซึม / ไม่มีแรง",           example:"He felt lethargic after a poor night's sleep.",                category:"daily", level:"C1" },
  { word:"hygiene",      phonetic:"/ˈhaɪdʒiːn/",  meaning:"สุขอนามัย",                       example:"Good hygiene prevents the spread of disease.",                 category:"daily", level:"B1" },
  { word:"insomnia",     phonetic:"/ɪnˈsɒmniə/",  meaning:"การนอนไม่หลับ",                   example:"Stress led to months of insomnia.",                            category:"daily", level:"B2" },
  { word:"unwind",       phonetic:"/ˌʌnˈwaɪnd/",  meaning:"ผ่อนคลาย",                        example:"She reads a book to unwind before bed.",                       category:"daily", level:"B1" },
  { word:"binge",        phonetic:"/bɪndʒ/",       meaning:"กินหรือทำอะไรมากเกินไปในทีเดียว", example:"They binged the entire series in one night.",                  category:"daily", level:"B2" },

  // ══════════════════════════════════════════════════════
  //  BUSINESS  💼  (60 words)
  // ══════════════════════════════════════════════════════
  { word:"sell",         phonetic:"/sel/",          meaning:"ขาย",                             example:"They sell handmade crafts online.",                             category:"business", level:"A1" },
  { word:"buy",          phonetic:"/baɪ/",          meaning:"ซื้อ",                            example:"We need to buy more supplies.",                                 category:"business", level:"A1" },
  { word:"price",        phonetic:"/praɪs/",        meaning:"ราคา",                            example:"The price of oil has risen sharply.",                           category:"business", level:"A1" },
  { word:"profit",       phonetic:"/ˈprɒfɪt/",      meaning:"กำไร",                            example:"The company reported record profits this year.",                category:"business", level:"A2" },
  { word:"discount",     phonetic:"/ˈdɪskaʊnt/",    meaning:"ส่วนลด",                          example:"She got a 20% discount on her purchase.",                       category:"business", level:"A2" },
  { word:"salary",       phonetic:"/ˈsæləri/",      meaning:"เงินเดือน",                       example:"His salary increased after the promotion.",                    category:"business", level:"A2" },
  { word:"invoice",      phonetic:"/ˈɪnvɔɪs/",      meaning:"ใบแจ้งหนี้",                      example:"Please send the invoice before end of month.",                  category:"business", level:"B1" },
  { word:"deadline",     phonetic:"/ˈdedlaɪn/",     meaning:"กำหนดส่งงาน",                     example:"The project deadline is next Friday.",                          category:"business", level:"B1" },
  { word:"negotiate",    phonetic:"/nɪˈɡəʊʃieɪt/",  meaning:"เจรจาต่อรอง",                     example:"They negotiated a better deal with the supplier.",              category:"business", level:"B1" },
  { word:"contract",     phonetic:"/ˈkɒntrækt/",    meaning:"สัญญา",                           example:"Both parties signed the contract yesterday.",                   category:"business", level:"B1" },
  { word:"startup",      phonetic:"/ˈstɑːtʌp/",     meaning:"บริษัทสตาร์ทอัพ",                 example:"He invested in several tech startups.",                         category:"business", level:"B1" },
  { word:"brand",        phonetic:"/brænd/",        meaning:"แบรนด์ / ตราสินค้า",              example:"They built a strong brand identity.",                           category:"business", level:"B1" },
  { word:"market share", phonetic:"/ˈmɑːkɪt ʃeə/", meaning:"ส่วนแบ่งตลาด",                    example:"Their market share grew to 30% this year.",                    category:"business", level:"B2" },
  { word:"revenue",      phonetic:"/ˈrevənjuː/",    meaning:"รายได้ / รายรับ",                 example:"Annual revenue grew by 20% last quarter.",                      category:"business", level:"B2" },
  { word:"collaborate",  phonetic:"/kəˈlæbəreɪt/",  meaning:"ร่วมมือกัน",                      example:"The two teams collaborated on the new product.",                category:"business", level:"B2" },
  { word:"forecast",     phonetic:"/ˈfɔːkɑːst/",   meaning:"พยากรณ์ / คาดการณ์",              example:"The sales forecast looks optimistic for Q4.",                   category:"business", level:"B2" },
  { word:"outsource",    phonetic:"/ˈaʊtsɔːs/",    meaning:"จ้างบริษัทภายนอกทำ",              example:"They decided to outsource their IT support.",                   category:"business", level:"B2" },
  { word:"portfolio",    phonetic:"/pɔːtˈfəʊliəʊ/", meaning:"แฟ้มผลงาน / พอร์ตการลงทุน",      example:"She presented her design portfolio to the client.",             category:"business", level:"B2" },
  { word:"pitch",        phonetic:"/pɪtʃ/",         meaning:"นำเสนอโครงการ",                   example:"He delivered a convincing pitch to investors.",                 category:"business", level:"B2" },
  { word:"KPI",          phonetic:"/ˌkeɪ piː ˈaɪ/", meaning:"ตัวชี้วัดผลการดำเนินงาน",         example:"The team missed its KPI targets this quarter.",                 category:"business", level:"B2" },
  { word:"cash flow",    phonetic:"/kæʃ fləʊ/",     meaning:"กระแสเงินสด",                    example:"Poor cash flow caused the startup to fail.",                    category:"business", level:"B2" },
  { word:"entrepreneur", phonetic:"/ˌɒntrəprəˈnɜː/",meaning:"ผู้ประกอบการ",                   example:"She is a successful entrepreneur in the tech industry.",         category:"business", level:"B2" },
  { word:"agile",        phonetic:"/ˈædʒaɪl/",      meaning:"คล่องตัว / วิธีทำงานแบบ Agile",  example:"The team uses agile methods to speed up development.",          category:"business", level:"B2" },
  { word:"stakeholder",  phonetic:"/ˈsteɪkhəʊldə/", meaning:"ผู้มีส่วนได้เสีย",                example:"All stakeholders approved the proposal.",                       category:"business", level:"C1" },
  { word:"benchmark",    phonetic:"/ˈbentʃmɑːk/",   meaning:"มาตรฐานอ้างอิง",                 example:"The company set a new benchmark for customer service.",         category:"business", level:"C1" },
  { word:"leverage",     phonetic:"/ˈliːvərɪdʒ/",   meaning:"ใช้ประโยชน์จาก",                  example:"They leveraged their network to win the contract.",             category:"business", level:"C1" },
  { word:"acquisition",  phonetic:"/ˌækwɪˈzɪʃən/",  meaning:"การซื้อกิจการ",                   example:"The acquisition boosted the firm's market share.",              category:"business", level:"C1" },
  { word:"liability",    phonetic:"/ˌlaɪəˈbɪlɪti/", meaning:"หนี้สิน / ความรับผิด",            example:"The company's liabilities exceeded its assets.",                category:"business", level:"C1" },
  { word:"merger",       phonetic:"/ˈmɜːdʒə/",      meaning:"การควบรวมกิจการ",                 example:"The merger created one of the largest banks.",                  category:"business", level:"C1" },
  { word:"equity",       phonetic:"/ˈekwɪti/",      meaning:"ส่วนของผู้ถือหุ้น",               example:"She owns 30% equity in the company.",                           category:"business", level:"C1" },
  { word:"due diligence",phonetic:"/djuː ˈdɪlɪdʒəns/",meaning:"การตรวจสอบก่อนลงทุน",         example:"They conducted due diligence before the merger.",               category:"business", level:"C1" },
  { word:"overhead",     phonetic:"/ˈəʊvəhed/",     meaning:"ค่าใช้จ่ายดำเนินงาน",             example:"They reduced overhead by moving to a smaller office.",          category:"business", level:"C1" },
  { word:"pivot",        phonetic:"/ˈpɪvət/",       meaning:"เปลี่ยนทิศทางธุรกิจ",             example:"The startup pivoted from B2C to B2B model.",                    category:"business", level:"C1" },
  { word:"fiscal",       phonetic:"/ˈfɪskəl/",      meaning:"เกี่ยวกับการเงิน",               example:"The fiscal year ends in December.",                             category:"business", level:"C1" },
  { word:"turnaround",   phonetic:"/ˈtɜːnəraʊnd/",  meaning:"การฟื้นตัว",                      example:"The company achieved a remarkable turnaround.",                 category:"business", level:"C1" },
  { word:"remuneration", phonetic:"/rɪˌmjuːnəˈreɪʃən/",meaning:"ค่าตอบแทน",                   example:"The remuneration package includes bonuses.",                    category:"business", level:"C2" },
  { word:"monopoly",     phonetic:"/məˈnɒpəli/",    meaning:"การผูกขาด",                       example:"The company held a monopoly on the market.",                    category:"business", level:"C1" },
  { word:"venture capital",phonetic:"/ˈventʃə ˈkæpɪtəl/",meaning:"เงินร่วมลงทุน",            example:"They raised venture capital to expand the business.",           category:"business", level:"C1" },
  { word:"quarterly",    phonetic:"/ˈkwɔːtəli/",    meaning:"รายไตรมาส",                       example:"Quarterly reports showed strong growth.",                       category:"business", level:"B2" },
  { word:"recession",    phonetic:"/rɪˈseʃən/",     meaning:"ภาวะเศรษฐกิจถดถอย",              example:"Many businesses closed during the recession.",                  category:"business", level:"C1" },
  { word:"inflation",    phonetic:"/ɪnˈfleɪʃən/",  meaning:"ภาวะเงินเฟ้อ",                    example:"Inflation reduced the value of their savings.",                 category:"business", level:"B2" },

  // ══════════════════════════════════════════════════════
  //  ACADEMIC  🎓  (60 words)
  // ══════════════════════════════════════════════════════
  { word:"study",        phonetic:"/ˈstʌdi/",       meaning:"เรียน / ศึกษา",                   example:"She studies English for two hours every day.",                  category:"academic", level:"A1" },
  { word:"learn",        phonetic:"/lɜːn/",         meaning:"เรียนรู้",                        example:"Children learn languages very quickly.",                        category:"academic", level:"A1" },
  { word:"teacher",      phonetic:"/ˈtiːtʃə/",      meaning:"ครู / อาจารย์",                   example:"My teacher explains things very clearly.",                      category:"academic", level:"A1" },
  { word:"exam",         phonetic:"/ɪɡˈzæm/",       meaning:"การสอบ",                          example:"The final exam is next week.",                                  category:"academic", level:"A1" },
  { word:"grade",        phonetic:"/ɡreɪd/",        meaning:"เกรด / คะแนน",                    example:"She got an A grade on her essay.",                              category:"academic", level:"A2" },
  { word:"lecture",      phonetic:"/ˈlektʃə/",      meaning:"การบรรยาย",                       example:"The lecture lasted two hours.",                                 category:"academic", level:"A2" },
  { word:"assignment",   phonetic:"/əˈsaɪnmənt/",   meaning:"งานที่ได้รับมอบหมาย",              example:"Submit your assignment before midnight.",                       category:"academic", level:"A2" },
  { word:"textbook",     phonetic:"/ˈtekstbʊk/",   meaning:"หนังสือเรียน",                    example:"The textbook costs $60 at the bookstore.",                      category:"academic", level:"A2" },
  { word:"research",     phonetic:"/rɪˈsɜːtʃ/",    meaning:"การวิจัย",                        example:"She conducted research on climate change.",                     category:"academic", level:"B1" },
  { word:"analyze",      phonetic:"/ˈænəlaɪz/",     meaning:"วิเคราะห์",                       example:"Students must analyze the data carefully.",                     category:"academic", level:"B1" },
  { word:"seminar",      phonetic:"/ˈsemɪnɑː/",     meaning:"การสัมมนา",                       example:"Attend the seminar on data science next Tuesday.",               category:"academic", level:"B1" },
  { word:"plagiarism",   phonetic:"/ˈpleɪdʒərɪzəm/",meaning:"การลอกเลียน",                    example:"Plagiarism can result in expulsion from university.",            category:"academic", level:"B2" },
  { word:"evaluate",     phonetic:"/ɪˈvæljueɪt/",   meaning:"ประเมิน",                        example:"The teacher evaluated each student's performance.",              category:"academic", level:"B2" },
  { word:"hypothesis",   phonetic:"/haɪˈpɒθɪsɪs/",  meaning:"สมมติฐาน",                       example:"They tested their hypothesis through experiments.",              category:"academic", level:"B2" },
  { word:"thesis",       phonetic:"/ˈθiːsɪs/",      meaning:"วิทยานิพนธ์",                    example:"She spent two years writing her doctoral thesis.",               category:"academic", level:"B2" },
  { word:"citation",     phonetic:"/saɪˈteɪʃən/",   meaning:"การอ้างอิง",                     example:"Every citation must follow APA format.",                         category:"academic", level:"B2" },
  { word:"curriculum",   phonetic:"/kəˈrɪkjʊləm/",  meaning:"หลักสูตร",                        example:"The new curriculum includes digital literacy.",                  category:"academic", level:"B2" },
  { word:"abstract",     phonetic:"/ˈæbstrækt/",    meaning:"บทคัดย่อ / นามธรรม",              example:"Write a 200-word abstract for your research paper.",             category:"academic", level:"B2" },
  { word:"bibliography", phonetic:"/ˌbɪbliˈɒɡrəfi/",meaning:"บรรณานุกรม",                    example:"Include a full bibliography at the end of the paper.",           category:"academic", level:"B2" },
  { word:"synopsis",     phonetic:"/ˈsɪnəpsɪs/",    meaning:"สรุปย่อ",                        example:"Please provide a synopsis of your research proposal.",           category:"academic", level:"C1" },
  { word:"faculty",      phonetic:"/ˈfækəlti/",     meaning:"คณะวิชา / อาจารย์ทั้งหมด",        example:"She joined the faculty of engineering.",                         category:"academic", level:"B2" },
  { word:"methodology",  phonetic:"/ˌmeθəˈdɒlədʒi/",meaning:"ระเบียบวิธีวิจัย",               example:"Their methodology was clearly explained in chapter 3.",          category:"academic", level:"C1" },
  { word:"empirical",    phonetic:"/ɪmˈpɪrɪkəl/",   meaning:"เชิงประจักษ์",                   example:"The study relied on empirical evidence.",                       category:"academic", level:"C1" },
  { word:"inference",    phonetic:"/ˈɪnfərəns/",    meaning:"การอนุมาน / ข้อสรุป",             example:"Draw inferences from the graph before writing.",                 category:"academic", level:"C1" },
  { word:"peer review",  phonetic:"/pɪə rɪˈvjuː/",  meaning:"การทบทวนโดยผู้เชี่ยวชาญ",        example:"The paper passed peer review before publication.",               category:"academic", level:"C1" },
  { word:"dissertation", phonetic:"/ˌdɪsəˈteɪʃən/", meaning:"วิทยานิพนธ์ปริญญาตรี",           example:"Her dissertation focused on urban migration patterns.",           category:"academic", level:"C1" },
  { word:"accredited",   phonetic:"/əˈkredɪtɪd/",   meaning:"ได้รับการรับรอง",                 example:"Make sure the university is fully accredited.",                  category:"academic", level:"C1" },
  { word:"interdisciplinary",phonetic:"/ˌɪntədɪsəˈplɪnəri/",meaning:"ข้ามสาขาวิชา",          example:"The project required an interdisciplinary approach.",             category:"academic", level:"C1" },
  { word:"scholar",      phonetic:"/ˈskɒlə/",       meaning:"นักวิชาการ",                     example:"He is a well-respected scholar in linguistics.",                  category:"academic", level:"B2" },
  { word:"paradigm",     phonetic:"/ˈpærədaɪm/",    meaning:"กระบวนทัศน์",                    example:"This discovery shifted the scientific paradigm.",                category:"academic", level:"C2" },
  { word:"critique",     phonetic:"/krɪˈtiːk/",     meaning:"วิจารณ์อย่างละเอียด",             example:"She wrote a thorough critique of the novel.",                    category:"academic", level:"C1" },
  { word:"annotate",     phonetic:"/ˈænəteɪt/",     meaning:"เขียนหมายเหตุ / อธิบายเพิ่มเติม", example:"Annotate the key passages in your textbook.",                   category:"academic", level:"B2" },
  { word:"paraphrase",   phonetic:"/ˈpærəfreɪz/",   meaning:"เขียนใหม่ด้วยคำพูดตัวเอง",       example:"Paraphrase the paragraph to avoid plagiarism.",                  category:"academic", level:"B2" },
  { word:"postgraduate", phonetic:"/ˌpəʊstˈɡrædʒuət/",meaning:"หลังปริญญาตรี",               example:"She enrolled in a postgraduate program in London.",               category:"academic", level:"B2" },
  { word:"epistemology", phonetic:"/ɪˌpɪstɪˈmɒlədʒi/",meaning:"ญาณวิทยา",                    example:"Epistemology asks how we know what we know.",                    category:"academic", level:"C2" },

  // ══════════════════════════════════════════════════════
  //  TRAVEL  ✈️  (55 words)
  // ══════════════════════════════════════════════════════
  { word:"passport",     phonetic:"/ˈpɑːspɔːt/",   meaning:"หนังสือเดินทาง",                  example:"Don't forget to bring your passport.",                          category:"travel", level:"A1" },
  { word:"ticket",       phonetic:"/ˈtɪkɪt/",       meaning:"ตั๋ว",                            example:"She bought a round-trip ticket to Paris.",                       category:"travel", level:"A1" },
  { word:"hotel",        phonetic:"/həʊˈtel/",      meaning:"โรงแรม",                          example:"We stayed at a hotel near the beach.",                           category:"travel", level:"A1" },
  { word:"luggage",      phonetic:"/ˈlʌɡɪdʒ/",     meaning:"สัมภาระ",                         example:"She packed light with just one piece of luggage.",               category:"travel", level:"A2" },
  { word:"departure",    phonetic:"/dɪˈpɑːtʃə/",   meaning:"การออกเดินทาง",                   example:"Departure is scheduled for 6 AM.",                               category:"travel", level:"A2" },
  { word:"arrival",      phonetic:"/əˈraɪvəl/",     meaning:"การมาถึง",                        example:"The arrival of the train was delayed.",                          category:"travel", level:"A2" },
  { word:"visa",         phonetic:"/ˈviːzə/",       meaning:"วีซ่า",                           example:"She applied for a tourist visa online.",                         category:"travel", level:"A2" },
  { word:"currency",     phonetic:"/ˈkʌrənsi/",     meaning:"สกุลเงิน",                        example:"Exchange your currency at the airport.",                         category:"travel", level:"A2" },
  { word:"sightseeing",  phonetic:"/ˈsaɪtsiːɪŋ/",  meaning:"การท่องเที่ยวชมสถานที่",          example:"We spent the morning sightseeing around the city.",              category:"travel", level:"B1" },
  { word:"customs",      phonetic:"/ˈkʌstəmz/",     meaning:"ด่านศุลกากร",                    example:"You must declare goods at customs.",                             category:"travel", level:"B1" },
  { word:"itinerary",    phonetic:"/aɪˈtɪnərəri/",  meaning:"แผนการเดินทาง",                   example:"She printed the itinerary before the trip.",                     category:"travel", level:"B1" },
  { word:"layover",      phonetic:"/ˈleɪoʊvər/",    meaning:"การแวะพักระหว่างทาง",             example:"We had a three-hour layover in Dubai.",                          category:"travel", level:"B1" },
  { word:"accommodation",phonetic:"/əˌkɒməˈdeɪʃən/",meaning:"ที่พัก",                         example:"The accommodation was clean and affordable.",                    category:"travel", level:"B1" },
  { word:"jet lag",      phonetic:"/ˈdʒet læɡ/",    meaning:"อาการเพลียจากการเดินทาง",         example:"She suffered from jet lag after the long flight.",               category:"travel", level:"B1" },
  { word:"backpacker",   phonetic:"/ˈbækˌpækə/",    meaning:"นักเดินทางแบบแบกเป้",             example:"Backpackers often stay in cheap hostels.",                        category:"travel", level:"B1" },
  { word:"landmark",     phonetic:"/ˈlændmɑːk/",   meaning:"สถานที่สำคัญ",                    example:"The Eiffel Tower is a famous landmark in Paris.",                category:"travel", level:"B1" },
  { word:"trek",         phonetic:"/trek/",         meaning:"การเดินทางผ่านพื้นที่ยาก",        example:"They went on a week-long trek through the mountains.",            category:"travel", level:"B1" },
  { word:"excursion",    phonetic:"/ɪkˈskɜːʃən/",   meaning:"การออกทัศนาจร",                   example:"We booked a day excursion to the ancient ruins.",                category:"travel", level:"B2" },
  { word:"embark",       phonetic:"/ɪmˈbɑːk/",      meaning:"ออกเดินทาง / เริ่มต้น",           example:"They embarked on a cruise around the Mediterranean.",            category:"travel", level:"B2" },
  { word:"quarantine",   phonetic:"/ˈkwɒrəntiːn/",  meaning:"กักกัน",                         example:"Travelers were placed in quarantine on arrival.",                category:"travel", level:"B2" },
  { word:"nomad",        phonetic:"/ˈnəʊmæd/",      meaning:"คนเร่ร่อน / ผู้เดินทาง",         example:"He is a digital nomad working from different countries.",         category:"travel", level:"B2" },
  { word:"transit",      phonetic:"/ˈtrænzɪt/",     meaning:"การผ่าน / แวะผ่าน",              example:"We were in transit through Singapore.",                          category:"travel", level:"B2" },
  { word:"charter",      phonetic:"/ˈtʃɑːtə/",     meaning:"เช่าเหมา (เครื่องบิน/เรือ)",      example:"They chartered a boat to explore the islands.",                  category:"travel", level:"C1" },
  { word:"itinerant",    phonetic:"/ɪˈtɪnərənt/",   meaning:"ที่เดินทางไปเรื่อยๆ",             example:"He lived an itinerant life as a traveling musician.",            category:"travel", level:"C1" },
  { word:"sojourn",      phonetic:"/ˈsɒdʒɜːn/",     meaning:"การพำนักชั่วคราว",                example:"She enjoyed a brief sojourn in the Swiss Alps.",                 category:"travel", level:"C2" },
  { word:"hostel",       phonetic:"/ˈhɒstəl/",      meaning:"โฮสเทล / ที่พักราคาถูก",          example:"They stayed at a hostel to save money.",                         category:"travel", level:"A2" },
  { word:"check-in",     phonetic:"/ˈtʃek ɪn/",    meaning:"เช็คอิน",                         example:"Online check-in saves time at the airport.",                     category:"travel", level:"A2" },
  { word:"boarding pass",phonetic:"/ˈbɔːdɪŋ pɑːs/",meaning:"บัตรขึ้นเครื่อง",                 example:"Show your boarding pass at the gate.",                           category:"travel", level:"A2" },
  { word:"time zone",    phonetic:"/ˈtaɪm zəʊn/",  meaning:"เขตเวลา",                        example:"Thailand is in a different time zone from London.",              category:"travel", level:"B1" },
  { word:"travel insurance",phonetic:"/ˈtrævəl ɪnˈʃʊərəns/",meaning:"ประกันการเดินทาง",     example:"Always buy travel insurance before a long trip.",                category:"travel", level:"B1" },

  // ══════════════════════════════════════════════════════
  //  TECHNOLOGY  💻  (60 words)
  // ══════════════════════════════════════════════════════
  { word:"computer",     phonetic:"/kəmˈpjuːtə/",  meaning:"คอมพิวเตอร์",                    example:"She uses a computer for work every day.",                       category:"tech", level:"A1" },
  { word:"internet",     phonetic:"/ˈɪntənet/",     meaning:"อินเทอร์เน็ต",                   example:"The internet changed how we communicate.",                      category:"tech", level:"A1" },
  { word:"website",      phonetic:"/ˈwebsaɪt/",     meaning:"เว็บไซต์",                       example:"They launched a new website for their business.",               category:"tech", level:"A1" },
  { word:"password",     phonetic:"/ˈpɑːswɜːd/",   meaning:"รหัสผ่าน",                       example:"Use a strong password for your accounts.",                      category:"tech", level:"A1" },
  { word:"download",     phonetic:"/ˌdaʊnˈləʊd/",  meaning:"ดาวน์โหลด",                      example:"Download the app from the App Store.",                          category:"tech", level:"A2" },
  { word:"upload",       phonetic:"/ˌʌpˈləʊd/",    meaning:"อัปโหลด",                        example:"Please upload your files to the cloud.",                        category:"tech", level:"A2" },
  { word:"software",     phonetic:"/ˈsɒftweə/",    meaning:"ซอฟต์แวร์",                      example:"They installed new software on all computers.",                 category:"tech", level:"A2" },
  { word:"hardware",     phonetic:"/ˈhɑːdweə/",    meaning:"ฮาร์ดแวร์",                      example:"The hardware upgrade improved system speed.",                   category:"tech", level:"A2" },
  { word:"backup",       phonetic:"/ˈbækʌp/",      meaning:"สำรองข้อมูล",                    example:"Always back up your data before updating.",                     category:"tech", level:"A2" },
  { word:"database",     phonetic:"/ˈdeɪtəbeɪs/",  meaning:"ฐานข้อมูล",                      example:"All user data is stored in a secure database.",                 category:"tech", level:"B1" },
  { word:"server",       phonetic:"/ˈsɜːvə/",       meaning:"เซิร์ฟเวอร์",                    example:"The server crashed during peak hours.",                         category:"tech", level:"B1" },
  { word:"debug",        phonetic:"/ˌdiːˈbʌɡ/",    meaning:"แก้บั๊ก",                        example:"It took hours to debug that function.",                         category:"tech", level:"B1" },
  { word:"interface",    phonetic:"/ˈɪntəfeɪs/",    meaning:"ส่วนติดต่อผู้ใช้",               example:"The new interface is cleaner and more intuitive.",              category:"tech", level:"B1" },
  { word:"bandwidth",    phonetic:"/ˈbændwɪdθ/",   meaning:"แบนด์วิดท์",                    example:"Streaming HD video requires high bandwidth.",                   category:"tech", level:"B1" },
  { word:"API",          phonetic:"/ˌeɪ piː ˈaɪ/",  meaning:"ตัวเชื่อมต่อโปรแกรม",            example:"The API allows apps to share data seamlessly.",                 category:"tech", level:"B2" },
  { word:"framework",    phonetic:"/ˈfreɪmwɜːk/",  meaning:"กรอบการทำงาน",                   example:"React is a popular JavaScript framework.",                      category:"tech", level:"B2" },
  { word:"algorithm",    phonetic:"/ˈælɡərɪðəm/",  meaning:"อัลกอริทึม",                     example:"The sorting algorithm runs in O(n log n) time.",                category:"tech", level:"B2" },
  { word:"encryption",   phonetic:"/ɪnˈkrɪpʃən/",  meaning:"การเข้ารหัส",                    example:"End-to-end encryption protects your messages.",                 category:"tech", level:"B2" },
  { word:"repository",   phonetic:"/rɪˈpɒzɪtəri/",  meaning:"คลังเก็บโค้ด",                  example:"Push your changes to the Git repository.",                      category:"tech", level:"B2" },
  { word:"cloud computing",phonetic:"/klaʊd kəmˈpjuːtɪŋ/",meaning:"การประมวลผลบนคลาวด์",  example:"Cloud computing allows flexible remote work.",                  category:"tech", level:"B2" },
  { word:"cybersecurity",phonetic:"/ˌsaɪbəsɪˈkjʊərɪti/",meaning:"ความปลอดภัยทางไซเบอร์",  example:"Cybersecurity threats are growing every year.",                 category:"tech", level:"B2" },
  { word:"open source",  phonetic:"/ˈəʊpən sɔːs/", meaning:"โอเพนซอร์ส",                    example:"Linux is a well-known open source operating system.",           category:"tech", level:"B2" },
  { word:"iterate",      phonetic:"/ˈɪtəreɪt/",    meaning:"ทำซ้ำ / พัฒนาต่อเนื่อง",         example:"The team iterated on the design based on feedback.",            category:"tech", level:"B2" },
  { word:"scalable",     phonetic:"/ˈskeɪləbəl/",  meaning:"รองรับการขยายตัว",               example:"The app must be scalable to millions of users.",                category:"tech", level:"C1" },
  { word:"latency",      phonetic:"/ˈleɪtənsi/",    meaning:"ความหน่วง / เวลาตอบสนอง",        example:"Low latency is critical for online gaming.",                    category:"tech", level:"C1" },
  { word:"deprecated",   phonetic:"/ˈdeprəkeɪtɪd/", meaning:"ล้าสมัย / ไม่แนะนำให้ใช้",      example:"This API is deprecated and will be removed soon.",              category:"tech", level:"C1" },
  { word:"machine learning",phonetic:"/məˈʃiːn ˈlɜːnɪŋ/",meaning:"การเรียนรู้ของเครื่อง",  example:"Machine learning powers many recommendation systems.",          category:"tech", level:"C1" },
  { word:"neural network",phonetic:"/ˈnjʊərəl ˈnetwɜːk/",meaning:"โครงข่ายประสาทเทียม",    example:"A neural network can recognize images accurately.",             category:"tech", level:"C1" },
  { word:"microservices",phonetic:"/ˈmaɪkrəʊˌsɜːvɪsɪz/",meaning:"สถาปัตยกรรมไมโครเซอร์วิส",example:"They rebuilt the app using microservices.",                     category:"tech", level:"C1" },
  { word:"containerization",phonetic:"/kənˌteɪnəraɪˈzeɪʃən/",meaning:"การบรรจุแอปในคอนเทนเนอร์",example:"Docker popularized containerization.",                    category:"tech", level:"C1" },

  // ══════════════════════════════════════════════════════
  //  MEDICAL  🏥  (55 words)
  // ══════════════════════════════════════════════════════
  { word:"headache",     phonetic:"/ˈhedeɪk/",      meaning:"ปวดหัว",                         example:"She took a painkiller for her headache.",                       category:"medical", level:"A1" },
  { word:"fever",        phonetic:"/ˈfiːvə/",       meaning:"ไข้",                            example:"The child had a high fever all night.",                          category:"medical", level:"A1" },
  { word:"medicine",     phonetic:"/ˈmedsɪn/",      meaning:"ยา",                             example:"Take this medicine twice a day.",                               category:"medical", level:"A1" },
  { word:"doctor",       phonetic:"/ˈdɒktə/",       meaning:"แพทย์",                          example:"The doctor recommended bed rest.",                              category:"medical", level:"A1" },
  { word:"nurse",        phonetic:"/nɜːs/",         meaning:"พยาบาล",                         example:"The nurse checked his blood pressure.",                         category:"medical", level:"A1" },
  { word:"allergy",      phonetic:"/ˈælədʒi/",      meaning:"การแพ้",                         example:"She has a severe allergy to peanuts.",                          category:"medical", level:"A2" },
  { word:"injury",       phonetic:"/ˈɪndʒəri/",     meaning:"การบาดเจ็บ",                     example:"He sustained a knee injury during the match.",                  category:"medical", level:"A2" },
  { word:"surgery",      phonetic:"/ˈsɜːdʒəri/",    meaning:"การผ่าตัด",                      example:"She recovered well after the surgery.",                         category:"medical", level:"A2" },
  { word:"symptom",      phonetic:"/ˈsɪmptəm/",     meaning:"อาการ",                          example:"Fever is a common symptom of the flu.",                         category:"medical", level:"B1" },
  { word:"prescription", phonetic:"/prɪˈskrɪpʃən/", meaning:"ใบสั่งยา",                       example:"You need a prescription to buy this medicine.",                 category:"medical", level:"B1" },
  { word:"vaccine",      phonetic:"/ˈvæksiːn/",     meaning:"วัคซีน",                         example:"The vaccine was administered to millions of people.",            category:"medical", level:"B1" },
  { word:"immune system",phonetic:"/ɪˈmjuːn ˈsɪstəm/",meaning:"ระบบภูมิคุ้มกัน",            example:"A healthy diet strengthens the immune system.",                 category:"medical", level:"B2" },
  { word:"chronic",      phonetic:"/ˈkrɒnɪk/",      meaning:"เรื้อรัง",                       example:"He suffers from chronic back pain.",                            category:"medical", level:"B2" },
  { word:"diagnosis",    phonetic:"/ˌdaɪəɡˈnəʊsɪs/",meaning:"การวินิจฉัยโรค",               example:"The diagnosis confirmed it was pneumonia.",                     category:"medical", level:"B2" },
  { word:"inflammation", phonetic:"/ˌɪnfləˈmeɪʃən/",meaning:"การอักเสบ",                     example:"Inflammation is the body's natural response.",                  category:"medical", level:"B2" },
  { word:"antibiotic",   phonetic:"/ˌæntɪbaɪˈɒtɪk/",meaning:"ยาปฏิชีวนะ",                   example:"Overuse of antibiotics leads to resistance.",                   category:"medical", level:"B2" },
  { word:"contagious",   phonetic:"/kənˈteɪdʒəs/",  meaning:"ติดต่อได้ง่าย",                  example:"Chickenpox is highly contagious.",                              category:"medical", level:"B2" },
  { word:"hypertension", phonetic:"/ˌhaɪpəˈtenʃən/",meaning:"ความดันโลหิตสูง",               example:"Stress is a major cause of hypertension.",                      category:"medical", level:"C1" },
  { word:"metabolism",   phonetic:"/məˈtæbəlɪzəm/", meaning:"กระบวนการเมแทบอลิซึม",          example:"Exercise boosts your metabolism.",                              category:"medical", level:"C1" },
  { word:"prognosis",    phonetic:"/prɒɡˈnəʊsɪs/",  meaning:"การพยากรณ์โรค",                 example:"The prognosis for a full recovery is good.",                    category:"medical", level:"C1" },
  { word:"anesthetic",   phonetic:"/ˌænɪsˈθetɪk/",  meaning:"ยาชา / ยาสลบ",                 example:"The patient was given a local anesthetic.",                     category:"medical", level:"C1" },
  { word:"pathogen",     phonetic:"/ˈpæθədʒən/",    meaning:"เชื้อโรค",                       example:"The pathogen spread rapidly through the population.",            category:"medical", level:"C1" },
  { word:"relapse",      phonetic:"/ˈriːlæps/",     meaning:"การกลับมาป่วยซ้ำ",               example:"She suffered a relapse after stopping medication.",             category:"medical", level:"C1" },
  { word:"sedative",     phonetic:"/ˈsedətɪv/",     meaning:"ยาระงับประสาท",                  example:"The doctor prescribed a mild sedative.",                        category:"medical", level:"C1" },
  { word:"malnutrition", phonetic:"/ˌmælnjuːˈtrɪʃən/",meaning:"ภาวะทุพโภชนาการ",            example:"Malnutrition affects millions of children worldwide.",           category:"medical", level:"C1" },
  { word:"palliative",   phonetic:"/ˈpæliətɪv/",    meaning:"บรรเทาอาการ",                    example:"Palliative care focuses on comfort, not curing.",               category:"medical", level:"C2" },

  // ══════════════════════════════════════════════════════
  //  IDIOMS  💬  (45 phrases)
  // ══════════════════════════════════════════════════════
  { word:"break the ice",             phonetic:"", meaning:"ละลายพฤติกรรม",                   example:"He told a joke to break the ice at the meeting.",               category:"idiom", level:"B1" },
  { word:"spill the beans",           phonetic:"", meaning:"เปิดเผยความลับ",                  example:"Don't spill the beans about the surprise party!",               category:"idiom", level:"B1" },
  { word:"under the weather",         phonetic:"", meaning:"ไม่สบาย / รู้สึกไม่ดี",           example:"I'm feeling a bit under the weather today.",                    category:"idiom", level:"B1" },
  { word:"cost an arm and a leg",     phonetic:"", meaning:"ราคาแพงมาก",                     example:"That sports car costs an arm and a leg.",                       category:"idiom", level:"B1" },
  { word:"once in a blue moon",       phonetic:"", meaning:"นานๆ ครั้ง",                     example:"We only visit that restaurant once in a blue moon.",             category:"idiom", level:"B1" },
  { word:"break a leg",               phonetic:"", meaning:"โชคดีนะ",                        example:"Break a leg at your performance tonight!",                      category:"idiom", level:"B1" },
  { word:"every cloud has a silver lining",phonetic:"",meaning:"ทุกวิกฤตมีโอกาส",           example:"Every cloud has a silver lining — stay positive.",               category:"idiom", level:"B1" },
  { word:"hit the sack",              phonetic:"", meaning:"เข้านอน",                        example:"I'm exhausted. I'm going to hit the sack.",                      category:"idiom", level:"B1" },
  { word:"no pain, no gain",          phonetic:"", meaning:"ไม่มีความเพียร ไม่มีความสำเร็จ",  example:"Train hard — no pain, no gain.",                                 category:"idiom", level:"B1" },
  { word:"pull someone's leg",        phonetic:"", meaning:"แกล้งหลอกเล่น",                  example:"I was just pulling your leg — it was a joke.",                  category:"idiom", level:"B1" },
  { word:"when pigs fly",             phonetic:"", meaning:"ไม่มีวันเกิดขึ้น",               example:"He'll clean his room when pigs fly.",                            category:"idiom", level:"B1" },
  { word:"you can't judge a book by its cover",phonetic:"",meaning:"อย่าตัดสินจากภายนอก",  example:"Don't judge — you can't judge a book by its cover.",             category:"idiom", level:"B1" },
  { word:"hit the nail on the head",  phonetic:"", meaning:"พูดถูกต้องตรงประเด็น",           example:"You hit the nail on the head with that point.",                  category:"idiom", level:"B2" },
  { word:"bite the bullet",           phonetic:"", meaning:"อดทน / กัดฟัน",                  example:"She bit the bullet and went to the dentist.",                    category:"idiom", level:"B2" },
  { word:"burn bridges",              phonetic:"", meaning:"ตัดสัมพันธ์อย่างถาวร",            example:"Don't burn bridges when you leave a job.",                       category:"idiom", level:"B2" },
  { word:"the ball is in your court", phonetic:"", meaning:"ถึงคราวของคุณแล้ว",              example:"I made my offer — the ball is in your court.",                  category:"idiom", level:"B2" },
  { word:"back to the drawing board", phonetic:"", meaning:"เริ่มต้นใหม่ตั้งแต่แรก",         example:"The plan failed, so it's back to the drawing board.",            category:"idiom", level:"B2" },
  { word:"a blessing in disguise",    phonetic:"", meaning:"สิ่งดีที่ซ่อนอยู่ในสิ่งแย่",     example:"Losing that job was a blessing in disguise.",                    category:"idiom", level:"B2" },
  { word:"beat around the bush",      phonetic:"", meaning:"พูดอ้อมค้อม",                    example:"Stop beating around the bush and get to the point.",              category:"idiom", level:"B2" },
  { word:"bite off more than you can chew",phonetic:"",meaning:"รับงานมากเกินความสามารถ",   example:"Don't bite off more than you can chew.",                         category:"idiom", level:"B2" },
  { word:"get out of hand",           phonetic:"", meaning:"เกินควบคุม",                     example:"The argument got out of hand quickly.",                          category:"idiom", level:"B2" },
  { word:"kick the bucket",           phonetic:"", meaning:"ตาย (สแลง)",                     example:"He kicked the bucket before finishing the novel.",               category:"idiom", level:"B2" },
  { word:"let the cat out of the bag", phonetic:"",meaning:"เปิดเผยความลับโดยไม่ตั้งใจ",     example:"He let the cat out of the bag about the surprise.",             category:"idiom", level:"B2" },
  { word:"miss the boat",             phonetic:"", meaning:"พลาดโอกาส",                      example:"She missed the boat on that investment.",                        category:"idiom", level:"B2" },
  { word:"on the ball",               phonetic:"", meaning:"ตื่นตัว / เฉียบคม",              example:"The new assistant is really on the ball.",                       category:"idiom", level:"B2" },
  { word:"throw in the towel",        phonetic:"", meaning:"ยอมแพ้",                         example:"After months of failing, he threw in the towel.",               category:"idiom", level:"B2" },
  { word:"give the benefit of the doubt",phonetic:"",meaning:"ให้โอกาส / เชื่อในทางดี",     example:"I'll give him the benefit of the doubt this time.",              category:"idiom", level:"C1" },
  { word:"the tip of the iceberg",    phonetic:"", meaning:"เพียงส่วนหนึ่งของปัญหาใหญ่",     example:"This complaint is just the tip of the iceberg.",                 category:"idiom", level:"C1" },
  { word:"under someone's thumb",     phonetic:"", meaning:"อยู่ใต้อำนาจใครบางคน",           example:"She felt she was always under her boss's thumb.",                 category:"idiom", level:"C1" },
  { word:"worth your salt",           phonetic:"", meaning:"มีความสามารถ / คุ้มค่า",          example:"Any teacher worth their salt knows this method.",                 category:"idiom", level:"C1" },

  // ══════════════════════════════════════════════════════
  //  SCIENCE  🔬  (50 words)
  // ══════════════════════════════════════════════════════
  { word:"atom",         phonetic:"/ˈætəm/",        meaning:"อะตอม",                         example:"An atom is the smallest unit of an element.",                   category:"science", level:"A2" },
  { word:"gravity",      phonetic:"/ˈɡrævɪti/",    meaning:"แรงโน้มถ่วง",                    example:"Gravity keeps planets in orbit around the sun.",                category:"science", level:"A2" },
  { word:"fossil",       phonetic:"/ˈfɒsəl/",      meaning:"ฟอสซิล",                        example:"The fossil was 65 million years old.",                           category:"science", level:"A2" },
  { word:"molecule",     phonetic:"/ˈmɒlɪkjuːl/",  meaning:"โมเลกุล",                       example:"Water consists of two hydrogen atoms bonded to oxygen.",        category:"science", level:"B1" },
  { word:"evolution",    phonetic:"/ˌiːvəˈluːʃən/", meaning:"วิวัฒนาการ",                    example:"Darwin's theory of evolution changed science forever.",         category:"science", level:"B1" },
  { word:"photosynthesis",phonetic:"/ˌfəʊtəʊˈsɪnθɪsɪs/",meaning:"การสังเคราะห์แสง",       example:"Plants use photosynthesis to convert sunlight into food.",       category:"science", level:"B1" },
  { word:"ecosystem",    phonetic:"/ˈiːkəʊsɪstəm/", meaning:"ระบบนิเวศ",                    example:"Coral reefs are fragile ecosystems.",                            category:"science", level:"B1" },
  { word:"hypothesis",   phonetic:"/haɪˈpɒθɪsɪs/",  meaning:"สมมติฐาน",                     example:"The scientist formed a hypothesis before testing.",             category:"science", level:"B1" },
  { word:"cell division",phonetic:"/sel dɪˈvɪʒən/",meaning:"การแบ่งเซลล์",                  example:"Cell division is essential for growth.",                         category:"science", level:"B1" },
  { word:"chromosome",   phonetic:"/ˈkrəʊməsəʊm/", meaning:"โครโมโซม",                      example:"Humans have 23 pairs of chromosomes.",                           category:"science", level:"B2" },
  { word:"catalyst",     phonetic:"/ˈkætəlɪst/",   meaning:"ตัวเร่งปฏิกิริยา",              example:"A catalyst speeds up a chemical reaction.",                     category:"science", level:"B2" },
  { word:"inertia",      phonetic:"/ɪˈnɜːʃə/",     meaning:"ความเฉื่อย",                    example:"An object in motion stays in motion due to inertia.",            category:"science", level:"B2" },
  { word:"osmosis",      phonetic:"/ɒzˈməʊsɪs/",   meaning:"ออสโมซิส",                      example:"Water moves into cells through osmosis.",                        category:"science", level:"B2" },
  { word:"radioactive",  phonetic:"/ˌreɪdiəʊˈæktɪv/",meaning:"กัมมันตรังสี",               example:"Radioactive materials must be handled with care.",              category:"science", level:"B2" },
  { word:"biodiversity", phonetic:"/ˌbaɪəʊdaɪˈvɜːsɪti/",meaning:"ความหลากหลายทางชีวภาพ",  example:"Deforestation reduces biodiversity.",                            category:"science", level:"B2" },
  { word:"combustion",   phonetic:"/kəmˈbʌstʃən/",  meaning:"การเผาไหม้",                   example:"Combustion releases energy in the form of heat.",                category:"science", level:"B2" },
  { word:"entropy",      phonetic:"/ˈentrəpi/",    meaning:"เอนโทรปี / ความไม่เป็นระเบียบ",  example:"Entropy always increases in a closed system.",                   category:"science", level:"C1" },
  { word:"quantum",      phonetic:"/ˈkwɒntəm/",    meaning:"ควอนตัม",                       example:"Quantum mechanics describes the behavior of particles.",          category:"science", level:"C1" },
  { word:"tectonic",     phonetic:"/tekˈtɒnɪk/",   meaning:"เกี่ยวกับแผ่นธรณีภาค",          example:"Tectonic plates cause earthquakes when they shift.",             category:"science", level:"C1" },
  { word:"neuroscience", phonetic:"/ˈnjʊərəʊsaɪəns/",meaning:"ประสาทวิทยาศาสตร์",           example:"Neuroscience helps us understand how the brain works.",          category:"science", level:"C1" },
  { word:"kinetic energy",phonetic:"/kɪˈnetɪk ˈenədʒi/",meaning:"พลังงานจลน์",              example:"A moving car has kinetic energy.",                               category:"science", level:"B2" },
  { word:"DNA",          phonetic:"/ˌdiː en ˈeɪ/",  meaning:"ดีเอ็นเอ",                     example:"DNA contains the genetic instructions for all living things.",   category:"science", level:"B1" },
  { word:"carbon cycle", phonetic:"/ˈkɑːbən ˈsaɪkəl/",meaning:"วัฏจักรคาร์บอน",            example:"The carbon cycle regulates CO₂ on Earth.",                      category:"science", level:"B2" },
  { word:"equilibrium",  phonetic:"/ˌiːkwɪˈlɪbriəm/",meaning:"สมดุล",                      example:"The reaction reached chemical equilibrium.",                     category:"science", level:"C1" },
  { word:"refraction",   phonetic:"/rɪˈfrækʃən/",  meaning:"การหักเหของแสง",                example:"Light refraction makes a straw look bent in water.",             category:"science", level:"B2" },

  // ══════════════════════════════════════════════════════
  //  ENVIRONMENT  🌿  (45 words)
  // ══════════════════════════════════════════════════════
  { word:"recycle",      phonetic:"/ˌriːˈsaɪkəl/", meaning:"รีไซเคิล",                      example:"We should recycle plastic bottles.",                             category:"environment", level:"A1" },
  { word:"pollution",    phonetic:"/pəˈluːʃən/",    meaning:"มลพิษ",                         example:"Air pollution is a serious problem in big cities.",              category:"environment", level:"A2" },
  { word:"flood",        phonetic:"/flʌd/",         meaning:"น้ำท่วม",                       example:"Heavy rains caused the river to flood.",                         category:"environment", level:"A2" },
  { word:"deforestation",phonetic:"/ˌdiːˌfɒrɪˈsteɪʃən/",meaning:"การตัดไม้ทำลายป่า",      example:"Deforestation is destroying many habitats.",                     category:"environment", level:"B1" },
  { word:"renewable",    phonetic:"/rɪˈnjuːəbəl/",  meaning:"หมุนเวียน / ทดแทนได้",          example:"Solar energy is a renewable resource.",                          category:"environment", level:"B1" },
  { word:"conservation", phonetic:"/ˌkɒnsəˈveɪʃən/",meaning:"การอนุรักษ์",                  example:"Wildlife conservation protects endangered species.",             category:"environment", level:"B1" },
  { word:"drought",      phonetic:"/draʊt/",        meaning:"ภัยแล้ง",                       example:"The severe drought caused crop failures.",                       category:"environment", level:"B1" },
  { word:"habitat",      phonetic:"/ˈhæbɪtæt/",    meaning:"ถิ่นที่อยู่อาศัย",               example:"Polar bears are losing their habitat due to melting ice.",       category:"environment", level:"B1" },
  { word:"compost",      phonetic:"/ˈkɒmpɒst/",     meaning:"ปุ๋ยหมัก",                      example:"She makes compost from kitchen scraps.",                         category:"environment", level:"B1" },
  { word:"carbon footprint",phonetic:"/ˈkɑːbən ˈfʊtprɪnt/",meaning:"รอยเท้าคาร์บอน",      example:"Flying increases your carbon footprint.",                        category:"environment", level:"B2" },
  { word:"greenhouse gas",phonetic:"/ˈɡriːnhaʊs ɡæs/",meaning:"ก๊าซเรือนกระจก",           example:"CO₂ is the most common greenhouse gas.",                         category:"environment", level:"B2" },
  { word:"biodegradable",phonetic:"/ˌbaɪəʊdɪˈɡreɪdəbəl/",meaning:"ย่อยสลายได้",           example:"Choose biodegradable packaging when possible.",                  category:"environment", level:"B2" },
  { word:"sustainable",  phonetic:"/səˈsteɪnəbəl/", meaning:"ยั่งยืน",                       example:"Sustainable farming protects the environment.",                  category:"environment", level:"B2" },
  { word:"emissions",    phonetic:"/ɪˈmɪʃənz/",    meaning:"การปล่อยมลพิษ",                 example:"Countries must reduce carbon emissions by 2050.",                category:"environment", level:"B2" },
  { word:"erosion",      phonetic:"/ɪˈrəʊʒən/",    meaning:"การกัดเซาะ",                    example:"Soil erosion damaged many farmlands.",                           category:"environment", level:"B2" },
  { word:"depletion",    phonetic:"/dɪˈpliːʃən/",  meaning:"การลดลง / การสิ้นเปลือง",       example:"Ozone layer depletion increases UV radiation.",                  category:"environment", level:"C1" },
  { word:"net zero",     phonetic:"/net ˈzɪərəʊ/",  meaning:"การปล่อยคาร์บอนสุทธิเป็นศูนย์",example:"The company aims to reach net zero by 2040.",                   category:"environment", level:"C1" },
  { word:"permafrost",   phonetic:"/ˈpɜːməfrɒst/",  meaning:"ดินเยือกแข็งถาวร",              example:"Melting permafrost releases trapped methane.",                   category:"environment", level:"C1" },
  { word:"carbon neutral",phonetic:"/ˈkɑːbən ˈnjuːtrəl/",meaning:"เป็นกลางทางคาร์บอน",     example:"The airline pledged to be carbon neutral by 2035.",              category:"environment", level:"C1" },
  { word:"reforestation",phonetic:"/ˌriːˌfɒrɪˈsteɪʃən/",meaning:"การปลูกป่าทดแทน",         example:"Reforestation helps restore damaged ecosystems.",                category:"environment", level:"B2" },
  { word:"ecosystem services",phonetic:"/ˈiːkəʊsɪstəm ˈsɜːvɪsɪz/",meaning:"บริการจากระบบนิเวศ",example:"Clean water is one of many ecosystem services.",             category:"environment", level:"C1" },

];

async function seed() {
  const total = vocabulary.length;
  console.log(`\n🌱 Seeding ${total} vocabulary cards to Firestore...\n`);
  const col = db.collection("cards");
  let count = 0;

  for (let i = 0; i < vocabulary.length; i += 20) {
    const batch = db.batch();
    const chunk = vocabulary.slice(i, i + 20);
    chunk.forEach((card) => {
      batch.set(col.doc(), { ...card, createdAt: new Date(), source: "seed" });
    });
    await batch.commit();
    count += chunk.length;
    process.stdout.write(`\r  ✓ ${count}/${total} cards uploaded`);
  }

  // Summary
  const cats = {};
  vocabulary.forEach(c => { cats[c.category] = (cats[c.category]||0)+1; });
  console.log("\n\n✅ Done!\n");
  console.log("📊 Summary:");
  Object.entries(cats).forEach(([k,v]) => console.log(`   ${k.padEnd(15)} ${v} cards`));
  console.log(`\n   Total: ${total} cards`);
  console.log("\n🚀 Run: npm run dev  — to start studying!\n");
  process.exit(0);
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
