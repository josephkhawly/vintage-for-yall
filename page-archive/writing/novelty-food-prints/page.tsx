import Link from 'next/link'
import ImageBlock from '@/components/ImageBlock'
import Image from 'next/image'

export default function NoveltyFoodPrints() {
  return (
    <article>
      <h1 className='text-5xl mb-[15px]'>This Summer, Wear What You Eat</h1>
      <h2 className='font-bold text-xl mb-[30px]'>
        Pasta, Tomatoes, Tinned Fish, and more are moving from our pantries into our personal style.
      </h2>
      <p className='mb-5'>
        It might feel as if tomatoes in fashion quite literally came out of nowhere&mdash;
        <Link
          className='underline'
          href='https://hypebeast.com/2024/6/jonathan-anderson-loewe-clutch-bag-accessory-viral-tomato-meme-into-reality'
          target='_blank'
          rel='noopener noreferrer'
        >
          if not a viral moment comparing an iteration of the fruit to Loewe
        </Link>
        &mdash;but food prints have quite a rich history when it comes to trending style. Also known
        as &ldquo;conversation prints,&rdquo; novelty patterns were originally seen in
        children&rsquo;s clothing depicting nursery rhymes and other educational imagery to wearers
        still learning to speak. Eventually making their way into popular women&rsquo;s fashions of
        the &lsquo;40s and &lsquo;50s, designs were created to quite literally, give people
        something to talk about, whether it be Greek mythology, gardening, or Campbell&rsquo;s Soup.
        So if anyone bothers arguing with you about it, your pasta dress is actually quite timeless.
      </p>
      <p className='mb-5'>
        Scroll to find some vintage and new novelty food prints that will have your mouth watering
        and your closet making a low growling noise, too.
      </p>

      <h2 className='font-bold text-3xl mt-5 mb-[15px] uppercase'>Dresses</h2>

      <ImageBlock
        product='Sofia Slip Dress by Lisa Says Gah'
        url='https://lisasaysgah.com/products/sofia-slip-dress-boun-appetito-black?variant=42793317597364&currency=USD&glCountry=US&glCurrency=USD&https%3A%2F%2Flisasaysgah.com%2F%3Futm_source=google&utm_medium=cpc&utm_campaign=utm_campaign&gad_source=1&gclid=CjwKCAjwp4m0BhBAEiwAsdc4aJdzNVRejq-CNA1WK-RJTeBdHMZjHC7l-Oy8MXZjo9707FPb1YGrlBoCtAYQAvD_BwE'
        price={158}
        alt='aaaaa'
        src='/novelty-food-prints/image9.png'
        description='Lisa Says Gah has created modern novelty patterns that easily rival vintage ones, especially
        their depictions of food. This seasonal spread of farfalle, spaghetti, basil, garlic, and
        tomato invokes a whimsy of what someone might be hoping to devour off the Amalfi Coast.'
      />

      <ImageBlock
        product='The Gwen Dress by Rachel Antonoff'
        url='https://rachelantonoff.com/products/gwen-dress-pink-seafood-tower?variant=40727397335105&currency=USD'
        price={278}
        alt=''
        src='/novelty-food-prints/image6.png'
        description='A food-inspired dress that really sets a scene or, in this case, a table. The combo of a tablecloth pattern with the oversized seafood tower print enhances the camp factor but maintains a chic edge thanks to the classic shift silhouette.'
      />

      <ImageBlock
        product='Vintage &lsquo;90s Tomato Print Dress by Cynthia Rowley via Etsy'
        url='https://etsy.com/listing/1750937349/vintage-1990s-1993-cynthia-rowley-tomato'
        price={128}
        alt=''
        src='/novelty-food-prints/image7.png'
        description='There&rsquo;s just something inherently fun about a tomato red, but lately,
                we&rsquo;ve been using the whole fruit to achieve our ideal summer vibe. This vintage Cynthia Rowley
                dress features a classic silhouette that would look perfect with a wicker purse and Italian leather
                mules.'
      />

      <h2 className='font-bold text-3xl mt-5 mb-[15px] uppercase'>Separates</h2>

      <ImageBlock
        product='The Hester Top in Juicy by Reformation'
        url='https://www.thereformation.com/products/hester-top/1308172JUI.html'
        price={98}
        alt=''
        src='/novelty-food-prints/image1.png'
        description='Reformation knows how to utilize midcentury style elements to create iconic
                pieces that immediately elevate a look. This sweetheart tank and its print of fruits, which are
                currently in season, can easily be worn to the farmer&rsquo;s market or dinner on the French Riviera.'
      />

      <ImageBlock
        product='Embroidered Fruits Side Bow Midi Skirt by Farm Rio'
        url='https://farmrio.com/products/embroidered-fruits-side-bow-midi-skirt-1?currency=USD&variant=41537519026269'
        price={275}
        alt=''
        src='/novelty-food-prints/image4.png'
        description='If you’re a bit intimidated by an all-over print, Farm Rio’s fruit skirt takes a more minimalist approach to the trend. It can be used as a pop of color for a neutral look.'
      />

      <ImageBlock
        product='Vintage ‘90s Picnic Print Blazer by Nicole Miller via eBay'
        url='https://www.ebay.com/itm/276465580581?itmmeta=01J1RW4NMGWFP1Y8CTSRWS8CB0&hash=item405ea1fa25:g:rooAAOSwCMdmQkx0&itmprp=enc%3AAQAJAAAA0NvbFfJ1qdcJZtkc9SqHN9E0b4B%2B1NtxWhoJrkhskZBRcPYfGHIzwZk74EB%2Be%2F4RefSEd3ZNgrjFk4Vv69m64xbX%2BNC%2FRbKax8ePLX%2FSkSTL44Y8Ypj3G%2F9bdp7XCkuu7roXwZnlBvDNXaBjLADcq0msNWETbSJi83XrBoPLsETjY0IVGy8c4cYfFD2DgOp%2FpGRIGtnuoMJfd%2BWdZx0a2wD4dHnliCPPm650xq20DbKISRde32CtNK0FfQts0jIr02kgYNeGSGHL5wsS%2Bdp30Mk%3D%7Ctkp%3ABk9SR6rakpyOZA'
        price={113}
        alt=''
        src='/novelty-food-prints/image5.png'
        description='Arguably the blueprint for the modern styles you see here, Nicole Miller&#39;s
                intricate designs would be a shame to leave out. Known for her novelty patterns printed on 100% silk,
                this blazer would be at home at a dinner party and the diner you head to after because you&rsquo;re
                still hungry.'
      />

      <h2 className='font-bold text-3xl mt-5 mb-[15px] uppercase'>Accessories</h2>

      <p className='mt-5 mb-[15px]'>
        <a
          className='underline'
          href='https://www.katespade.com/products/hot-sauce-silk-square-scarf/KS1004298.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          Kate Spade Hot Sauce Silk Square Scarf
        </a>{' '}
        $88
      </p>
      <p>
        <Image
          alt=''
          src='/novelty-food-prints/image10.png'
          width={353}
          height={529}
          className='mb-3 mx-auto'
        />
      </p>
      <p className='mb-[15px]'>
        Another designer brand known for their highly coveted novelty prints, Kate Spade brings the
        hear to a classic summer accessory&mdash;tie up in your hair al la Breakfast at
        Tiffany&rsquo;s, around your neck Roman Holiday style, or attach it to your purse for a pop
        of color (no Audrey Hepburn example here, sorry).
      </p>

      <ImageBlock
        product='Jeffrey Campbell Sweet-On-U Mules'
        url='https://jeffreycampbellshoes.com/products/sweet-on-u?variant=40788997898305'
        price={150}
        alt=''
        src='/novelty-food-prints/image8.png'
        description='Cherries and open-toed mules are top of mind every summer, though not typically together. Jeffrey Campbell’s take on this trend combines the sweetness of a traditional cherry print and bows with sexy patent leather and square-toe details.'
      />

      <p className='mt-5 mb-[15px]'>
        <a
          className='underline'
          href='https://www.anthropologie.com/shop/the-fiona-beaded-bag-produce-edition?color=075&inventoryCountry=US&countryCode=US&utm_medium=paid_search&utm_source=Google&utm_campaign=US+-+Shopping+-+PMAX+-+Apparel+-+Accessories+-+Accessories&utm_content=&utm_term=&creative=&device=c&matchtype=&network=x&utm_kxconfid=vx6rd81ts&gad_source=1&gclid=CjwKCAjwp4m0BhBAEiwAsdc4aCGcvVpo2HWL-F-r7_uEtvaP7RnS7i9NEutbSUAaoGZpwMj5hq-a6hoC3t0QAvD_BwE&gclsrc=aw.ds&type=STANDARD&size=One+Size&quantity=1'
          target='_blank'
          rel='noopener noreferrer'
        >
          The Fiona Beaded Bag: Produce Edition
        </a>{' '}
        by Anthropologie $88
      </p>
      <p>
        <Image
          alt=''
          src='/novelty-food-prints/image2.png'
          width={353}
          height={529}
          className='mb-3 mx-auto'
        />
      </p>
      <p className='mb-[15px]'>
        If you’re looking for a way to satiate your craving for the sold-out{' '}
        <a
          href='https://staud.clothing/products/tommy-beaded-bag-tomato'
          target='_blank'
          className='underline'
        >
          Staud tomato bag
        </a>{' '}
        that’s also a little more cost-friendly, this bag from Anthropologie has that all-over
        beaded in a baby blue that really makes the tomatoes pop. Not a tomato girl?{' '}
        <a
          href='https://www.anthropologie.com/shop/the-fiona-beaded-bag-produce-edition?color=230&inventoryCountry=US&countryCode=US&utm_medium=paid_search&utm_source=Google&utm_campaign=US+-+Shopping+-+PMAX+-+Apparel+-+Accessories+-+Accessories&utm_content=&utm_term=&creative=&device=c&matchtype=&network=x&utm_kxconfid=vx6rd81ts&gad_source=1&gclid=CjwKCAjwp4m0BhBAEiwAsdc4aCGcvVpo2HWL-F-r7_uEtvaP7RnS7i9NEutbSUAaoGZpwMj5hq-a6hoC3t0QAvD_BwE&gclsrc=aw.ds&type=STANDARD&size=One+Size&quantity=1'
          target='_blank'
          className='underline'
        >
          The brand also has an olive version.
        </a>
      </p>
    </article>
  )
}
