import { useMemo, useState } from "react";
import { Copy, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copyText } from "@/lib/engagement";

type EmojiEntry = { e: string; n: string; m: string; x: string };
type MeaningCategory = { id: string; label: string; items: EmojiEntry[] };

const CATEGORIES: MeaningCategory[] = [
  {
    id: "smileys",
    label: "Smileys",
    items: [
      { e: "😀", n: "Grinning Face", m: "A happy, friendly grin. The most general-purpose happy face, used for cheerful greetings and good news.", x: "Great to meet you! 😀" },
      { e: "😂", n: "Face with Tears of Joy", m: "Laughing so hard you are crying. The classic reaction to something very funny.", x: "That video had me in tears 😂" },
      { e: "🤣", n: "Rolling on the Floor Laughing", m: "Even stronger laughter than 😂 — something is absolutely hilarious, often used with a tilted head.", x: "I can't breathe 🤣" },
      { e: "😊", n: "Smiling Face with Smiling Eyes", m: "Warm, genuine happiness. Shy, sweet or politely pleased — softer than a big grin.", x: "Thanks for your help 😊" },
      { e: "😍", n: "Smiling Face with Heart-Eyes", m: "Love at first sight. Used for adoring a person, pet, food or anything irresistible.", x: "That puppy 😍" },
      { e: "😘", n: "Face Blowing a Kiss", m: "Sending love or a flirty kiss. Common in affectionate messages to friends and partners.", x: "Goodnight! 😘" },
      { e: "😎", n: "Smiling Face with Sunglasses", m: "Cool, confident and laid-back. Also means “deal with it” or that something is awesome.", x: "Passed the exam 😎" },
      { e: "🤩", n: "Star-Struck", m: "Amazed and starry-eyed, like meeting a celebrity or seeing something incredible.", x: "The concert was unreal 🤩" },
      { e: "🥳", n: "Partying Face", m: "Celebration mode: birthdays, promotions, Friday night. Often paired with 🎉.", x: "It's my birthday! 🥳" },
      { e: "😏", n: "Smirking Face", m: "Smug, sly or flirtatious. Suggests you know something others don't, or a teasing joke.", x: "I knew it 😏" },
      { e: "😌", n: "Relieved Face", m: "Calm relief after stress, or peaceful contentment. A quiet “phew, that's over.”", x: "Deadline met, finally 😌" },
      { e: "😴", n: "Sleeping Face", m: "Sleepy, tired or bored. Also used jokingly to say something is boring.", x: "Long day, I'm out 😴" },
      { e: "🤯", n: "Exploding Head", m: "Mind blown — shock, disbelief or amazement at something unbelievable.", x: "He scored 5 goals?! 🤯" },
      { e: "🥺", n: "Pleading Face", m: "Big puppy-dog eyes. Begging, asking sweetly, or feeling touched and emotional.", x: "Please come with me 🥺" },
      { e: "😢", n: "Crying Face", m: "Sad with a single tear. Genuine sadness, disappointment or sympathy.", x: "I miss you 😢" },
      { e: "😭", n: "Loudly Crying Face", m: "Overwhelmed with emotion — sobbing, whether from sadness or from laughing too hard.", x: "The ending made me cry 😭" },
      { e: "😤", n: "Face with Steam from Nose", m: "Frustrated, proud or triumphant — like a bull. Often “I did it” energy or annoyance.", x: "Finished the marathon 😤" },
      { e: "😡", n: "Enraged Face", m: "Very angry or enraged. Stronger than 😠 — use it for real outrage.", x: "My flight got cancelled 😡" },
      { e: "🤔", n: "Thinking Face", m: "Deep in thought, pondering or skeptical. A visual “hmm…”", x: "Not sure about that 🤔" },
      { e: "🙄", n: "Face with Rolling Eyes", m: "Exasperation, disbelief or sarcasm — the eye-roll reaction.", x: "He said that again 🙄" },
      { e: "😬", n: "Grimacing Face", m: "Awkward, nervous or embarrassed. The “yikes” face for uncomfortable moments.", x: "I sent it to the wrong chat 😬" },
      { e: "😇", n: "Smiling Face with Halo", m: "Innocent, angelic or playfully good. Often used ironically after a cheeky act.", x: "Who, me? 😇" },
    ],
  },
  {
    id: "gestures",
    label: "Gestures",
    items: [
      { e: "👍", n: "Thumbs Up", m: "Approval, agreement or “sounds good.” The universal sign for yes or well done.", x: "See you at 6 👍" },
      { e: "👎", n: "Thumbs Down", m: "Disapproval, dislike or “no.” The opposite of 👍.", x: "The plan didn't work 👎" },
      { e: "👏", n: "Clapping Hands", m: "Applause, praise or congratulations. Also used sarcastically for slow claps.", x: "Bravo, amazing work 👏" },
      { e: "🙏", n: "Folded Hands", m: "Please, thank you, or prayer. In many contexts it also means a high-five or gratitude.", x: "Thank you so much 🙏" },
      { e: "💪", n: "Flexed Biceps", m: "Strength, power or determination. Used for workouts, encouragement and resilience.", x: "You've got this 💪" },
      { e: "👌", n: "OK Hand", m: "Perfect, okay or approval. In some regions it can also mean money or zero.", x: "The design is 👌" },
      { e: "✌️", n: "Victory Hand", m: "Peace, victory or “two.” The classic peace sign in photos and messages.", x: "Peace out ✌️" },
      { e: "🤞", n: "Crossed Fingers", m: "Hoping for good luck, or a small white lie. “Fingers crossed!”", x: "Hope I get the job 🤞" },
      { e: "🤟", n: "Love-You Gesture", m: "“I love you” in American Sign Language — thumb, index and pinky extended.", x: "Love you! 🤟" },
      { e: "🤘", n: "Sign of the Horns", m: "Rock on! Used by metal and rock fans, or to mean “awesome” and party energy.", x: "Best concert ever 🤘" },
      { e: "👊", n: "Oncoming Fist", m: "A fist bump, or determination and strength. Also used for “punch” in games.", x: "Fist bump 👊" },
      { e: "✊", n: "Raised Fist", m: "Solidarity, protest, resistance or celebration of strength and unity.", x: "Stand together ✊" },
      { e: "👋", n: "Waving Hand", m: "Hello or goodbye — the friendly wave when arriving or leaving a chat.", x: "Hi everyone! 👋" },
      { e: "🤙", n: "Call Me Hand", m: "“Call me” or the shaka / hang-loose gesture — relaxed, surfer vibes.", x: "Call me later 🤙" },
      { e: "👈", n: "Backhand Index Pointing Left", m: "Pointing at something to the left — often used to highlight a link or previous message.", x: "Check this out 👈" },
      { e: "👉", n: "Backhand Index Pointing Right", m: "Pointing at something to the right, or drawing attention to the next point.", x: "Look here 👉" },
      { e: "👆", n: "Backhand Index Pointing Up", m: "“This above” — pointing to a previous message, or “one” in counting.", x: "This one 👆" },
      { e: "🤝", n: "Handshake", m: "A deal, agreement or greeting. Used for partnerships and “nice to meet you.”", x: "Deal! 🤝" },
    ],
  },
  {
    id: "hearts",
    label: "Hearts",
    items: [
      { e: "❤️", n: "Red Heart", m: "Love, affection and passion. The most used heart — for romance, family and deep appreciation.", x: "Love you ❤️" },
      { e: "🧡", n: "Orange Heart", m: "Warmth, friendship and care. A friendly, less intense love than red.", x: "Thinking of you 🧡" },
      { e: "💛", n: "Yellow Heart", m: "Friendship, happiness and positivity. On Snapchat it marks a best friend.", x: "You're the best 💛" },
      { e: "💚", n: "Green Heart", m: "Love for nature, health or envy. Also used for K-pop fandoms and eco topics.", x: "Love this planet 💚" },
      { e: "💙", n: "Blue Heart", m: "Trust, loyalty and calm love. Often for deep friendship or support.", x: "Always here for you 💙" },
      { e: "💜", n: "Purple Heart", m: "Love with a touch of glamour — also associated with BTS ARMY and compassion.", x: "Borahae 💜" },
      { e: "🖤", n: "Black Heart", m: "Dark humour, grief, rebellion or deep, edgy love. Also used for mourning.", x: "Forever in our hearts 🖤" },
      { e: "🤍", n: "White Heart", m: "Purity, peace and gentle love. Popular in aesthetic posts and memorials.", x: "Rest in peace 🤍" },
      { e: "🤎", n: "Brown Heart", m: "Warm, earthy love — used for racial solidarity, autumn and cosy feelings.", x: "Sending love 🤎" },
      { e: "💔", n: "Broken Heart", m: "Heartbreak, loss or deep disappointment. The symbol of a break-up or grief.", x: "We broke up 💔" },
      { e: "💕", n: "Two Hearts", m: "Mutual love, affection between two people, or extra warmth in a message.", x: "Miss you 💕" },
      { e: "💖", n: "Sparkling Heart", m: "Excited, dazzling love — infatuation and joyful affection.", x: "New crush 💖" },
      { e: "💗", n: "Growing Heart", m: "A heart swelling with love — feelings getting stronger.", x: "Falling more every day 💗" },
      { e: "💘", n: "Heart with Arrow", m: "Cupid's arrow — falling in love, Valentine's Day and crushes.", x: "Cupid struck 💘" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    items: [
      { e: "🐶", n: "Dog Face", m: "Dogs, loyalty and playfulness. Used for pets, cute moments and “good boy” jokes.", x: "My new puppy 🐶" },
      { e: "🐱", n: "Cat Face", m: "Cats, independence and cuteness. Also used playfully for someone catty.", x: "The cat stole my chair 🐱" },
      { e: "🦊", n: "Fox", m: "Cleverness, slyness or attractiveness (“a fox”). Also a cute woodland animal.", x: "Sly like a 🦊" },
      { e: "🐻", n: "Bear", m: "Bears, strength, hibernation or teddy bears. Also slang for a big, cuddly person.", x: "Sleeping like a 🐻" },
      { e: "🐼", n: "Panda", m: "Cuteness, calm and China. Often used for someone sleepy or adorable.", x: "Panda mode today 🐼" },
      { e: "🦁", n: "Lion", m: "Courage, royalty and strength. The king of the jungle — confidence and pride.", x: "Lionhearted 🦁" },
      { e: "🐸", n: "Frog", m: "Frogs, or “none of my business” (Kermit sipping tea). Also transformation and luck.", x: "But that's none of my business 🐸" },
      { e: "🐵", n: "Monkey Face", m: "Cheeky, playful or mischievous behaviour — the monkey emoji family.", x: "Cheeky little 🐵" },
      { e: "🙈", n: "See-No-Evil Monkey", m: "“I can't look!” — embarrassment, shyness or pretending not to see something.", x: "I can't watch 🙈" },
      { e: "🦄", n: "Unicorn", m: "Magic, uniqueness and fantasy. Used for something rare, special or dreamy.", x: "You're one of a kind 🦄" },
      { e: "🦋", n: "Butterfly", m: "Transformation, beauty and freedom — and the “butterflies” of a crush.", x: "You give me 🦋" },
      { e: "🐝", n: "Honeybee", m: "Hard work (“busy as a bee”), sweetness, or Beyoncé's BeyHive fans.", x: "Busy 🐝 today" },
      { e: "🐢", n: "Turtle", m: "Slowness, patience and longevity. Often joking about being slow.", x: "Moving at 🐢 speed" },
      { e: "🐙", n: "Octopus", m: "Creativity, flexibility or multitasking — many arms, many tasks.", x: "Juggling everything 🐙" },
      { e: "🦖", n: "T-Rex", m: "Dinosaurs, prehistoric power or something old-fashioned. Fun and fierce.", x: "Rawr 🦖" },
      { e: "🐳", n: "Spouting Whale", m: "Whales, the ocean, or “whale hello there” puns. Also crypto “whale” slang.", x: "Whale hello there 🐳" },
    ],
  },
  {
    id: "food",
    label: "Food",
    items: [
      { e: "🍕", n: "Pizza", m: "Pizza night, parties and comfort food. One of the most used food emoji.", x: "Pizza night? 🍕" },
      { e: "🍔", n: "Hamburger", m: "Burgers, fast food and casual eating. Also used for American food culture.", x: "Burger run 🍔" },
      { e: "🍟", n: "French Fries", m: "Fries, fast food and snacks. Often paired with 🍔 for a meal.", x: "Fries before guys 🍟" },
      { e: "🌮", n: "Taco", m: "Tacos and Taco Tuesday. A celebration of Mexican street food.", x: "It's Taco Tuesday 🌮" },
      { e: "🍣", n: "Sushi", m: "Sushi and Japanese food. Used for dinner plans and foodie posts.", x: "Sushi date 🍣" },
      { e: "🍦", n: "Soft Ice Cream", m: "Ice cream, summer treats and sweet cravings.", x: "Ice cream weather 🍦" },
      { e: "🎂", n: "Birthday Cake", m: "Birthdays and celebrations. The default “happy birthday” emoji.", x: "Happy birthday! 🎂" },
      { e: "🍩", n: "Doughnut", m: "Doughnuts, sweet treats and police jokes. Also “donut” puns.", x: "Donut worry 🍩" },
      { e: "🍫", n: "Chocolate Bar", m: "Chocolate, cravings and comfort. Also a Valentine's gift staple.", x: "Need 🍫 now" },
      { e: "☕", n: "Hot Beverage", m: "Coffee, tea or a hot drink — mornings, work breaks and cosy chats.", x: "Coffee first ☕" },
      { e: "🍺", n: "Beer Mug", m: "Beer, bars and cheers. Used for Friday nights and celebrations.", x: "Cheers! 🍺" },
      { e: "🍷", n: "Wine Glass", m: "Wine, fine dining and relaxation — or “wine o'clock” jokes.", x: "Wine o'clock 🍷" },
      { e: "🥑", n: "Avocado", m: "Avocados, brunch, health food and millennial food culture.", x: "Avocado toast 🥑" },
      { e: "🍓", n: "Strawberry", m: "Strawberries, sweetness and summer. Also a cute aesthetic fruit.", x: "Berry cute 🍓" },
      { e: "🍉", n: "Watermelon", m: "Summer, freshness and picnics. Also a symbol of Palestinian solidarity online.", x: "Summer vibes 🍉" },
      { e: "🥤", n: "Cup with Straw", m: "Soda, juice or bubble tea — cold drinks and takeaway refreshment.", x: "Boba run 🥤" },
    ],
  },
  {
    id: "objects",
    label: "Objects",
    items: [
      { e: "📱", n: "Mobile Phone", m: "Phones, texting and mobile life. Used for “call me” or screen-time jokes.", x: "My 📱 died again" },
      { e: "💻", n: "Laptop", m: "Work, study and remote jobs. The work-from-home symbol.", x: "Working from home 💻" },
      { e: "🎧", n: "Headphone", m: "Music, podcasts and focus time. Used for “listening now” posts.", x: "New playlist 🎧" },
      { e: "🎁", n: "Wrapped Gift", m: "Gifts, surprises and celebrations — birthdays, holidays and giveaways.", x: "Surprise! 🎁" },
      { e: "🎈", n: "Balloon", m: "Parties, birthdays and celebrations. Light, happy and festive.", x: "Party time 🎈" },
      { e: "💡", n: "Light Bulb", m: "A bright idea, inspiration or a lightbulb moment.", x: "I've got an idea 💡" },
      { e: "🔥", n: "Fire", m: "Hot, lit, excellent — or literally fire. Used for praise: “that's fire.”", x: "That track is 🔥" },
      { e: "⭐", n: "Star", m: "Favourites, ratings and excellence. Marking something as a star.", x: "Five ⭐ service" },
      { e: "🎯", n: "Bullseye", m: "Right on target — goals, accuracy or “nailed it.”", x: "Right on 🎯" },
      { e: "💎", n: "Gem Stone", m: "Precious, rare and valuable — or literally diamonds and luxury.", x: "You're a 💎" },
      { e: "🔑", n: "Key", m: "Keys, access, secrets or “the key to success.”", x: "The 🔑 to success" },
      { e: "🔒", n: "Locked", m: "Locked, private or secure. Used for passwords and “locked in” focus.", x: "Locked in 🔒" },
      { e: "✈️", n: "Airplane", m: "Travel, flights and holidays. The classic “off on a trip” emoji.", x: "Off to Paris ✈️" },
      { e: "🚗", n: "Automobile", m: "Cars, driving and road trips.", x: "Road trip! 🚗" },
      { e: "🏠", n: "House", m: "Home, houses and staying in. “Home sweet home.”", x: "Home at last 🏠" },
      { e: "💰", n: "Money Bag", m: "Money, wealth and paydays. Used for salaries, wins and riches.", x: "Payday 💰" },
      { e: "📚", n: "Books", m: "Studying, reading and knowledge. The back-to-school symbol.", x: "Study mode 📚" },
      { e: "⏰", n: "Alarm Clock", m: "Time, alarms, deadlines and reminders. “Don't be late!”", x: "Set your ⏰" },
    ],
  },
  {
    id: "symbols",
    label: "Symbols",
    items: [
      { e: "💯", n: "Hundred Points", m: "Perfect score, 100% agreement or “keeping it 100” — total approval.", x: "That is 💯 true" },
      { e: "❗", n: "Red Exclamation Mark", m: "Important, urgent or surprising. Adds emphasis and alert.", x: "Don't forget ❗" },
      { e: "❓", n: "Red Question Mark", m: "Confusion or a big question. Emphasises “what?”", x: "What happened ❓" },
      { e: "⚠️", n: "Warning", m: "Caution, danger or an important warning. Also used for “trigger warning.”", x: "⚠️ Spoilers ahead" },
      { e: "♻️", n: "Recycling Symbol", m: "Recycling, sustainability and eco-friendly messages.", x: "Please recycle ♻️" },
      { e: "☮️", n: "Peace Symbol", m: "Peace, harmony and anti-war messages. The 1960s peace sign.", x: "Peace ☮️" },
      { e: "✝️", n: "Latin Cross", m: "Christianity, faith and church. Used in religious contexts and memorials.", x: "Blessed ✝️" },
      { e: "☪️", n: "Star and Crescent", m: "Islam and Muslim identity. Used for Ramadan, Eid and religious greetings.", x: "Ramadan Mubarak ☪️" },
      { e: "🕉️", n: "Om", m: "Hinduism, yoga and spirituality. The sacred syllable Om.", x: "Namaste 🕉️" },
      { e: "☯️", n: "Yin Yang", m: "Balance, harmony and duality — opposites completing each other.", x: "Find your balance ☯️" },
      { e: "💤", n: "Zzz", m: "Sleeping, bored or “snore.” Used for bedtime or dull content.", x: "Off to bed 💤" },
      { e: "💥", n: "Collision", m: "Boom, impact or a dramatic moment. Comics-style “pow!”", x: "Plot twist 💥" },
      { e: "✨", n: "Sparkles", m: "Magic, sparkle, clean or new. Used to make anything feel special and shiny.", x: "Feeling ✨ today" },
      { e: "🌈", n: "Rainbow", m: "Hope, pride, diversity and beauty after a storm. A symbol of LGBTQ+ pride.", x: "Love is love 🌈" },
      { e: "☀️", n: "Sun", m: "Sunshine, summer, warmth and good moods.", x: "Sunny day ☀️" },
      { e: "🌙", n: "Crescent Moon", m: "Night, sleep and calm. Used for goodnight messages and night owls.", x: "Goodnight 🌙" },
      { e: "❄️", n: "Snowflake", m: "Winter, cold and snow. Also “unique like a snowflake.”", x: "First snow ❄️" },
      { e: "⚡", n: "High Voltage", m: "Energy, speed and power. Used for fast, electric moments.", x: "Full of ⚡" },
    ],
  },
];

export function EmojiMeanings() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.flatMap((c) =>
      (category === "all" || c.id === category ? c.items : []).map((item) => ({
        ...item,
        categoryLabel: c.label,
      })),
    ).filter(
      (item) =>
        !q ||
        item.n.toLowerCase().includes(q) ||
        item.m.toLowerCase().includes(q) ||
        item.e.includes(query.trim()),
    );
  }, [category, query]);

  const onCopy = async (entry: EmojiEntry) => {
    const ok = await copyText(entry.e);
    if (ok) toast.success(`Copied ${entry.e} ${entry.n}`);
    else toast.error("Copy failed — select the emoji and copy manually");
  };

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="em-search">Search emoji meanings</Label>
        <div className="relative mt-1.5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="em-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “heart”, “laugh”, “fire”…"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            category === "all" ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c.id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Tap any emoji card to copy it. {visible.length} emoji shown.
      </p>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No emoji match “{query}”. Try another word.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visible.map((item) => (
            <article
              key={`${item.categoryLabel}-${item.e}-${item.n}`}
              className="rounded-lg border p-4 transition-colors hover:border-primary"
            >
              <div className="flex items-start justify-between gap-2">
                <button
                  type="button"
                  onClick={() => void onCopy(item)}
                  title={`Copy ${item.e}`}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-4xl transition-colors hover:bg-muted"
                >
                  {item.e}
                </button>
                <Button type="button" size="sm" variant="outline" onClick={() => void onCopy(item)}>
                  <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <h3 className="mt-2 font-medium">{item.n}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.m}</p>
              <p className="mt-2 rounded-md bg-muted px-2.5 py-1.5 text-sm italic">{item.x}</p>
              <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">{item.categoryLabel}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
