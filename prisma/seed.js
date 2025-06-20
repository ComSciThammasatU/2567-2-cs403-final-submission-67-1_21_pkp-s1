import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.Answer.deleteMany();
    await prisma.Question.deleteMany();
    await prisma.QuestionCategory.deleteMany();
    await prisma.Article.deleteMany();
    const breeds = [
            { name: 'ชิสุ' },
            { name: 'โกลเด้น รีทรีฟเวอร์' },
            { name: 'ปอมเมอเรเนียน' },
            { name: 'บีเกิ้ล' },
            { name: 'ดัชชุนด์' },
            { name: 'ชเนาเซอร์' },
            { name: 'พุดเดิ้ล' },
            { name: 'บูลด็อก' },
            { name: 'ไซบีเรียน ฮัสกี้' },
            { name: 'ชิวาวา' },
            { name: 'คอร์กี้' },
            { name: 'อิงลิช ค็อกเกอร์ สแปเนียล' },
            { name: 'อเมริกัน พิตบูล เทอร์เรียร์' },
            { name: 'เซนต์เบอร์นาร์ด' },
            { name: 'บอสตัน เทอร์เรียร์' },
            { name: 'เกรย์ฮาวด์' },
            { name: 'อิงลิช บูลล์เทอร์เรียร์' },
            { name: 'สปิตซ์' },
            { name: 'มอลทีส' },
            { name: 'ออสเตรเลียน เชพเพิร์ด' },
            { name: 'ชิบะ' },
            { name: 'ลาบราดอร์ รีทรีฟเวอร์' },
            { name: 'ไทยหลังอาน' },
            { name: 'ไทยบางแก้ว' },

    ];

    for (const breed of breeds) {
        await prisma.Breed.upsert({
            where: { name: breed.name },
            update : {},
            create: {
                name: breed.name,
            },
        });
    }
    console.log('Breeds seeded');

    await prisma.QuestionCategory.create({
        data:{
            title : "คำถามเกี่ยวกับสภาพแวดล้อมและความเป็นอยู่",
            questions: {
                create: [
                    { text: "คุณอาศัยอยู่ที่ไหน?", inputType: "SELECT", options: ["บ้าน","คอนโด","อพาร์ตเมนต์"] },
                    { text: "ในครอบครัวของคุณมีเด็กเล็กหรือไม่?", inputType: "RADIO", options: ["มี","ไม่มี"] },
                    { text: "คุณเคยเลี้ยงสัตว์เลี้ยงอื่นๆ มาก่อนหรือไม่? หากเคย เป็นสัตว์ประเภทใด?", inputType: "TEXT"},
                    {text: "ที่พักอาศัยมีรั้วหรือสิ่งกั้นไหม?", inputType: "RADIO", options: ["มี","ไม่มี"] },
                ],
            }
        }
    });

    await prisma.QuestionCategory.create({
    data: {
      title: "คำถามเกี่ยวกับการใช้ชีวิตและตารางเวลา",
      questions: {
        create: [
          { text: "คุณมีอาชีพหรือทำงานประจำคืออะไร?", inputType: "TEXT" },
          { text: "เวลาที่เข้างานและเลิกงานประมาณกี่โมง?", inputType: "TEXT" },
          { text: "คุณมักจะต้องเดินทางบ่อยออกไปนอกบ้านหรือไม่?", inputType: "RADIO", options:["ใช่","ไม่ใช่"] },
          { text: "คุณคิดว่าการเลี้ยงสุนัขมีผลกระทบต่อชีวิตประจำวันหรือไม่?", inputType:"RADIO",options:["มี","ไม่มี"] },
        ]
      }
    }
  });

   await prisma.QuestionCategory.create({
    data: {
      title: "คำถามเกี่ยวกับการความพร้อมทางการเงิน",
      questions: {
        create: [
          { text: "เงินเดือนโดยเฉลี่ยของคุณประมาณเท่าไร?", inputType: "SELECT" ,options:["น้อยกว่า 20000 บาท","20000-500000 บาท","มากกว่า 50000 บาท"]},
          { text: "คุณคาดว่าคุณจะสามารถจัดการค่าใช้จ่ายเฉลี่ยต่อเดือนสำหรับสุนัขได้เท่าไร?", inputType: "SELECT" ,options:["น้อยกว่า 2000 บาท","2000-100000 บาท","มากกว่า 10000 บาท"]},
        ]
      }
    }
  });

  await prisma.QuestionCategory.create({
    data: {
      title: "คำถามเกี่ยวกับความตั้งใจและแรงจูงใจ",
      questions: {
        create: [
          { text: "คุณใช้เวลานานเท่าใดในการตัดสินใจที่จะรับเลี้ยงสุนัข?", inputType: "TEXT"},
          { text: "อะไรคือเหตุผลหลักที่คุณต้องการรับเลี้ยงสุนัข?", inputType: "TEXT"},
        ]
      }
    }
  });
  
  await prisma.Article.createMany({
    data: [
      {
        title: 'การดูแลสุนัขพื้นฐาน',
        content: `<p><strong>การให้อาหาร:</strong>
        1.เลือกอาหารสุนัขคุณภาพดีที่เหมาะสมกับวัยและสายพันธุ์. 
        2.ให้ปริมาณอาหารที่เหมาะสมตามคำแนะนำของสัตวแพทย์หรือผู้ผลิต. 
        3.หลีกเลี่ยงการให้อาหารคนบางชนิดที่อาจเป็นอันตรายต่อสุนัข.</p>

        <p><strong>การออกกำลังกาย:</strong>
         1. พาสุนัขออกกำลังกายเป็นประจำ เช่น เดินเล่น วิ่ง หรือเล่นเกมที่สนุกสนาน. 
         2. ปรับเปลี่ยนกิจกรรมออกกำลังกายให้เหมาะสมกับวัยและสายพันธุ์. 
         3. ให้สุนัขมีโอกาสสำรวจและเล่นในพื้นที่ที่ปลอดภัยและมีสิ่งกระตุ้นทางจิตใจ</p>

          <p><strong>การดูแลสุขภาพประจำ:</strong>
          1.พาไปตรวจสุขภาพเป็นประจำเพื่อตรวจสอบสุขภาพโดยรวมและป้องกันโรค. 
          2.ให้ยาถ่ายพยาธิและฉีดวัคซีนตามคำแนะนำของสัตวแพทย์. 
          3.ดูแลสุขภาพช่องปากและฟัน เช่น การแปรงฟันสุนัขอย่างสม่ำเสมอ. 
          4.ตรวจสอบและกำจัดหมัด เห็บ และไรในหู. </p>
        
          <p><strong>การฝึกฝน:</strong>
          1.ฝึกคำสั่งพื้นฐาน เช่น นั่ง คอย ห้าม. 
          2.สร้างความผูกพันและเรียนรู้กฎพื้นฐานของบ้าน. 
          3.ใช้ความอดทนและสอดคล้องในการฝึกเพื่อสร้างความสัมพันธ์ที่ดีระหว่างเจ้าของกับสุนัข</p>

          <p><strong>การรักษาความสะอาด:</strong>
          1.อาบน้ำสุนัขเป็นประจำตามความเหมาะสม. 
          2.แปรงขนสุนัขเพื่อกำจัดขนที่หลุดและป้องกันปัญหาผิวหนัง. 
          3.ทำความสะอาดบ้านและกรงสุนัขอย่างสม่ำเสมอ</p>

          <p><strong>การป้องกันโรค:</strong>
          1.ฉีดวัคซีนและให้ยาถ่ายพยาธิตามคำแนะนำของสัตวแพทย์. 
          2.ป้องกันไม่ให้สุนัขสัมผัสกับสิ่งที่เป็นอันตราย เช่น สารพิษหรืออาหารบางชนิด. 
          3.ตรวจสอบและกำจัดหมัด เห็บ และไรในหู. </p>

          <p><strong>การปฐมพยาบาลเบื้องต้น:</strong>
          1.เรียนรู้การปฐมพยาบาลเบื้องต้นสำหรับสัตว์เลี้ยง เช่น การห้ามเลือด การทำแผล. 
          2.เตรียมอุปกรณ์ปฐมพยาบาลเบื้องต้น เช่น ผ้าก๊อซ แอลกอฮอล์และน้ำยาฆ่าเชื้อ. 
          3.รู้สัญญาณเตือนของโรคและอาการผิดปกติของสุนัข</p>

        `,
        image: 'Dog-tried.jpg',
      },

      {
        title: '10 อาหารต้องห้ามที่ไม่ควรให้สุนัขกิน',
        content: `<p> <strong>1.กระดูก </strong>
                  ความจริงแล้วกระดูกไม่ใช่อาหารที่ดีต่อสุขภาพของสุนัขเท่าไหร่ ถ้าเลี่ยงได้ก็ควรหลีกเลี่ยง แต่คนที่เลี้ยงสุนัขยังสามารถให้น้องกินกระดูกได้เพียงแต่ต้องเป็นกระดูกดิบเท่านั้น เพราะนิ่มและย่อยช่วยให้สุนัขย่อยได้ดี แต่ก็ต้องระวังเชื้อโรคที่อาจปะปนมา ส่วนกระดูกที่ห้ามให้น้องหมากินเด็ดขาดคือกระดูกต้มสุก เพราะกระดูกที่สุกจะแตกหักง่าย ถ้าสุนัขกินเข้าไปอาจทิ่มแทงส่วนต่าง ๆ ของอวัยวะในระบบย่อยอาหารได้ เช่น กระเพาะ ลำไส้ ฯลฯ</p>
                  <p> <strong>2.ตับและเครื่องใน</strong>
                  ตับและเครื่องในส่วนใหญ่จะมีธาตุฟอสฟอรัสเยอะ น้องหมาสามารถกินได้แต่อย่าให้เขากินเป็นประจำทุกวันหรือเกือบทุกวัน เพราะหากสุนัขได้รับฟอสฟอรัสเป็นระยะเวลานานจะทำให้ตับและไตทำงานหนักจนมีโอกาสเป็นนิ่วในระบบทางเดินปัสสาวะได้ นอกจากนี้ตับและเครื่องในยังอาจทำให้สุนัขมีปัญหาเรื่องกระดูก ทำให้กระดูกแตกหักง่ายหรือกระดูกบาง</p>
                  <p> <strong>3.นมวัวหรือผลิตภัณฑ์ที่ทำจากนมวัว </strong>
                  ร่างกายน้องหมาส่วนใหญ่จะขาดเอมไซน์สำหรับใช้ย่อยนมวัว เราอาจจะเห็นเขากินอย่างเอร็ดอร่อย แต่นมวัวจะทำให้สุนัขอาหารไม่ย่อย อาเจียน และท้องเสียได้ พวกผลิตภัณฑ์จากนมวัวอย่างเนยกับชีสก็ควรเซย์โนไปเลย ห้ามให้น้องหมากินเพราะน้องจะท้องเสียและอาเจียน แต่ถ้าอยากให้น้องกินนมก็ควรกินนมสำหรับสุนัขโดยเฉพาะหรือให้กินนมแพะ เพราะนมแพะมีน้ำตาลแลคโตสน้อยกว่านมชนิดอื่น ๆ</p>
                  <p> <strong>4.ช็อกโกแลต  </strong>
                  ขนมต้องห้ามที่ไม่ควรให้สุนัขกินเด็ดขาดก็คือช็อกโกแลต! เพราะในช็อกโกแลตมีสาร “Theobromine” ซึ่งเป็นกลุ่มเดียวกับสารคาเฟอีน สารนี้จะกระตุ้นให้ร่างกายสุนัขหลั่งอะดรีนาลีน (Adrenaline) ทำให้หัวใจน้องเต้นเร็ว เหงื่อออกเยอะ ถ้ากินเข้าไปเยอะมาก ๆ สุนัขอาจมีอาการอาเจียน ท้องเสีย กระวนกระวาย จนอาจถึงขั้นเสียชีวิตได้เลย อันตรายมาก รวมถึงพวกขนมที่มีช็อกโกแลตเป็นส่วนผสมก็เป็นอันตรายต่อสุนัขเช่นเดียวกัน แต่สารนี้ในช็อกโกแลตไม่เป็นอันตรายต่อคน </p>
                  <p> <strong>5.ไข่ดิบ </strong>
                  ไข่ดิบอาจทำให้สุนัขอาหารเป็นพิษได้ เพราะไข่ดิบอาจปนเปื้อนเชื้อแบคทีเรียจนทำให้น้องหมาท้องเสีย นอกจากนี้ในไข่ดิบก็มีเอนไซม์อะวิดินที่ส่งผลต่อการดูดซับไบโอตินซึ่งเป็นสารที่จำเป็นต่อการบำรุงขนและผิวหนังของสุนัข ส่งผลให้สุนัขมีปัญหาเกี่ยวกับโรคผิวหนังได้</p>
                  <p> <strong>6.หัวหอมและกระเทียม  </strong>
                  คนที่เลี้ยงสุนัขไม่ควรให้อาหารที่มีส่วนผสมของหัวหอมและกระเทียมแก่สุนัขเด็ดขาด เพราะพวกนี้มีสารที่ชื่อว่า ไทโอซัลเฟต (Thiosulphate) ทำให้สุนัขเลือดจางได้ และหากสุนัขกินหัวหอมและกระเทียมในปริมาณมากจะมีอาการหายใจถี่หรือหัวใจเต้นเร็ว เป็นอันตรายต่อน้องหมามาก ๆ</p>
                  <p> <strong>7.องุ่นและลูกเกด </strong>
                  ในองุ่นและลูกเกดมีสารที่สามารถทำให้สุนัขไตวายเฉียบพลันได้ อีกทั้งยังสามารถทำให้สุนัขเกิดอาการท้องเสียจนร่างกายขาดน้ำ เบื่ออาหาร และอาเจียนได้ ถ้าจะให้น้องหมากินผลไม้ควรหาอย่างอื่นมาแทนที่ไม่ใ่ช่องุ่นกับลูกเกดจะดีกว่า</p>
                  <p> <strong>8.ชา กาแฟ หรือเครื่องดื่มที่มีคาเฟอีน </strong>
                  กาแฟและชามีสารคาเฟอีนที่ทำให้หัวใจสุนัขเต้นไม่เป็นจังหวะ กล้ามเนื้อเกร็ง หากสุนัขได้รับมากเกินไปก็จะทำให้ช็อคหรือเสียชีวิต/p>
                  <p> <strong>9.เกลือ </strong>
                  หากน้องหมาได้รับเกลือเยอะเกินไปจะทำให้เกิดอาการกระหายน้ำและปัสสาวะบ่อย สิ่งที่น่ากลัวคือเมื่อไหร่ที่น้องหมาเริ่มอาเจียน ท้องเสีย สั่น อุณหภูมิในร่างกายสูง อาการเหล่านี้เป็นสัญญาณบ่งบอกว่าสุนัขได้รับเกลือเยอะเกินไป ควรพาไปพบสัตวแพทย์เพื่อทำการรักษาโดยเร็ว</p>
                  <p> <strong>10.ขนมปัง </strong>
                  ในขนมปังมียีสต์เป็นส่วนประกอบ ซึ่งเจ้ายีสต์ตัวนี้นี่แหละค่ะที่จะไปรบกวนระบบการย่อยอาหารของสุนัข ทำให้สุนัขเกิดลมในกระเพาะอาหาร ส่งผลให้น้องท้องอืดหรืออาหารไม่ย่อยได้ แถมถ้าให้สุนัขกินขนมปังเยอะยังเสี่ยงต่อการเกิดโรคอ้วนด้วย</p>
        `,  
        image: 'Dog-food.png',
      },
        
      {
        title: 'รวมเรื่องต้องรู้เกี่ยวกับการฉีดวัคซีนสุนัข',
        content: `<p> <strong>วัคซีนสุนัขมีอะไรบ้าง? </strong>
                  โรคติดต่อในสุนัขมีหลายโรคมาก เช่น โรคพิษสุนัขบ้า โรคฉี่หนู หรือโรคลำไส้อักเสบ ซึ่งแต่ละโรคก็ล้วนเป็นโรคร้ายแรงที่มีอันตรายถึงขั้นทำให้น้องหมาเสียชีวิตได้ หรือสามารถแพร่กระจายจากน้องหมาสู่เจ้าของได้ แต่ไม่จำเป็นต้องกังวลไป เพราะในปัจจุบันมีวัคซีนสุนัขที่สามารถป้องกันโรคเหล่านี้ได้ โดยวัคซีนสุนัขที่จำเป็นต้องฉีด จะมีอยู่ 2 ชนิดหลัก ๆ ดังนี้</p>

                  <p> <strong>1. วัคซีนสุนัขรวม 5 โรค  </strong>
                    วัคซีนสุนัขรวม 5 โรค เป็นวัคซีนที่จำเป็นต้องฉีดในน้องหมาทุกตัว เพราะสามารถป้องกัน 5 โรคติดต่อร้ายแรงที่พบบ่อยในสุนัข ซึ่งส่วนใหญ่จะเป็นโรคที่ไม่มีวิธีรักษาโดยตรงและสามารถนำไปสู่การเสียชีวิตได้ โดยวัคซีนสุนัขรวม 5 โรค มีดังนี้
                    โรคไข้หัดสุนัข : เกิดจากการติดเชื้อไวรัสในกลุ่มมอร์บิลลิไวรัส (Morbillivirus) เป็นโรคติดต่อร้ายแรงที่พบบ่อยในลูกสุนัข และในปัจจุบันยังไม่มียารักษาโดยเฉพาะ  เมื่อติดเชื้อแล้วจะมีโอกาสเสียชีวิตได้ง่าย
                    โรคลำไส้อักเสบในสุนัข : เกิดจากการติดเชื้อไวรัสพาร์โว (Parvovirus) หรือโคโรน่าไวรัส (Coronavirus) ในระบบทางเดินอาหาร พบได้บ่อยและมีความรุนแรงในลูกสุนัข ในปัจจุบันยังไม่มียารักษาโดยตรง จะต้องดูแลรักษาตามอาการ เพื่อให้สุขภาพของสุนัขกลับมาใกล้เคียงปกติโดยเร็วที่สุดเท่านั้น
                    โรคหวัดและหลอดลมอักเสบติดต่อ : เป็นโรคที่เกิดได้ทั้งจากเชื้อไวรัสและเชื้อแบคทีเรีย โดยจะได้รับเชื้อผ่านทางอากาศจากการไอของสุนัขที่เป็นโรคนี้ และเมื่อเป็นแล้วจะต้องดูว่าสุนัขเกิดเชื้ออะไร หากเป็นเชื้อแบคทีเรียจะรักษาด้วยยาปฏิชีวนะได้ แต่ถ้าเป็นเชื้อไวรัสจะต้องรักษาตามอาการ และรอให้ระบบภูมิคุ้มกันของสุนัขกำจัดโรคนี้ออกไปได้เอง
                    โรคตับอักเสบ : เกิดจากการติดเชื้อไวรัส Canine adenovirus Type 1 (CAV-1) ผ่านการสัมผัสน้ำลาย กินปัสสาวะ หรืออุจจาระของสัตว์ที่ป่วย จัดเป็นโรคติดต่อร้ายแรงที่ทำให้สุนัขเสียชีวิตได้ โดยอัตราการเสียชีวิตจะเพิ่มสูงขึ้นในกลุ่มสุนัขที่อายุน้อย
                    โรคฉี่หนู : เกิดจากเชื้อแบคทีเรียที่มาจากปัสสาวะของหนู เมื่อเป็นแล้วจะสามารถแพร่กระจายจากสัตว์เลี้ยงสู่สัตว์เลี้ยง สัตว์เลี้ยงสู่คน หรือคนสู่คนได้ โดยในสุนัขมักจะได้รับเชื้อฉี่หนูจากน้ำที่ติดเชื้อผ่านการว่ายน้ำ ดื่มน้ำ หรือเดินลุยน้ำ
                    วัคซีนสุนัขรวม 5 โรคจะมีราคาเริ่มต้นที่เข็มละ 350 บาท

                    2. <strong> วัคซีนพิษสุนัขบ้า (Rabies vaccine) </strong>
                    วัคซีนพิษสุนัขบ้าเป็นวัคซีนที่สุนัขและสัตว์เลี้ยงทุกตัวจะต้องได้รับโดยไม่มีข้อยกเว้น เพราะโรคพิษสุนัขบ้าเป็นโรคที่สามารถเกิดขึ้นได้กับสัตว์เลี้ยงลูกด้วยนมทุกชนิด เมื่อเป็นแล้วจะสามารถแพร่กระจายจากสัตว์สู่สัตว์ หรือสัตว์สู่คนได้
                    ในปัจจุบันยังไม่มียารักษาโรคพิษสุนัขบ้า หากได้รับเชื้อแล้วไม่มีการป้องกันหรือรักษาอย่างทันท่วงทีจะทำให้เสียชีวิตได้ วิธีการป้องกันที่ดีที่สุดจึงเป็นการฉีดวัคซีนป้องกันโรคพิษสุนัขบ้า
                    วัคซีนพิษสุนัขบ้านั้น จะมีราคาเริ่มต้นที่เข็มละ 100 บาท
                  </p>

                  <p>  <strong>ตารางการตรวจสุขภาพและฉีดวัคซีนสุนัข </strong>
                     ช่วงอายุ  4-6 สัปดาห์ :พาน้องหมาไปถ่ายพยาธิและตรวจสุขภาพ
                     ช่วงอายุ  8 สัปดาห์	 :วัคซีนสุนัขรวม 5 โรค ครั้งที่ 1 + ถ่ายพยาธิ
                     ช่วงอายุ  12 สัปดาห์	 :วัคซีนสุนัขรวม 5 โรค ครั้งที่ 2 + วัคซีนพิษสุนัขบ้า ครั้งที่ 1 + ถ่ายพยาธิ
                     ช่วงอายุ  16 สัปดาห์	 :วัคซีนสุนัขรวม 5 โรค ครั้งที่ 3 + วัคซีนพิษสุนัขบ้า ครั้งที่ 2 + ถ่ายพยาธิ
                     ช่วงอายุ  ทุกปี	     :ฉีดวัคซีนสุนัขรวม 5 โรคและวัคซีนพิษสุนัขบ้า เพื่อกระตุ้นภูมิคุ้มกันอย่างสม่ำเสมอ
                  </p>
                  <p>
                     <strong>คำแนะนำในการดูแลน้องหมาหลังฉีดวัคซีน </strong>
                      หลังจากที่น้องฉีดวัคซีนแล้ว แนะนำให้ดูแลด้วยวิธีการต่อไปนี้
                      ให้น้องหมาพักสังเกตอาการที่คลินิกประมาณ 30-60 นาที เพื่อให้แน่ใจว่าอาการปกติ แล้วค่อยพากลับบ้าน
                      งดอาบน้ำ 7 วัน เพราะหลังฉีดวัคซีน น้องหมาอาจมีผลข้างเคียงอย่างอาการอ่อนเพลีย มีไข้ต่ำ ๆ หรือเบื่ออาหารได้
                      หลีกเลี่ยงการพาน้องหมาออกไปเที่ยวข้างนอกอย่างน้อย 1-2 สัปดาห์ เพื่อให้รอให้วัคซีนกระตุ้นระบบภูมิคุ้มกันอย่างเต็มที่
                  </p>
                  <p>
                    <strong> ผลข้างเคียงที่อาจเกิดขึ้นได้จากการฉีดวัคซีนสุนัข </strong>

                    ผลข้างเคียงที่พบได้ทั่วไปจากการฉีดวัคซีนสุนัข มีดังนี้
                    อาการบวมอักเสบและเจ็บบริเวณที่ฉีดวัคซีน
                    อาการซึม เบื่ออาหาร กินอาหารได้น้อยลง
                    มีไข้ต่ำ ๆ อ่อนเพลีย
                    โดยส่วนใหญ่อาการเหล่านี้จะค่อย ๆ ดีขึ้นภายใน 1-2 วัน ถ้าหากอาการไม่ดีขึ้น หรือมีผลข้างเคียงที่เป็นอันตรายอื่น ๆ เช่น บวมรอบดวงตา ใบหน้า ปาก เป็นตุ่ม มีผื่นขึ้นตามตัว อาเจียน ถ่ายเหลว หอบ หัวใจเต้นเร็ว อ่อนแรง เดินเซ ช็อค หรือหมดสติ จะต้องรีบพาน้องหมาไปพบสัตวแพทย์ทันที
                  </p>
        `,
        image: 'Dog-vaccination.jpg',
      },

    ]
  })

}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });