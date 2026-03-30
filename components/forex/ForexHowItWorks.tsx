import imgForexImg from 'figma:asset/cf45541d2eaf766313f6760d4e89ea81082930fc.png';

export default function ForexHowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Platform image */}
          <div className="shrink-0">
            <img
              src={imgForexImg}
              alt="Forex trading platform"
              className="rounded-lg object-cover shadow-md"
              style={{ width: 488, maxWidth: '100%', height: 424 }}
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-snug">
              How does Forex<br />Trading work?
            </h2>
            <p className="text-gray-700 text-base leading-8">
              Forex trading is similar to trading shares or futures except that when trading
              foreign exchange you are buying or selling one currency against another and you do
              not take delivery of the underlying currency. One of the key advantages Forex has
              over other financial instruments is that relatively small lot sizes can be traded —
              lot sizes can be as small as 1000 units (one micro lot). Typically, foreign
              exchange also involves leverage which in some cases can be as high as 1:1000, which
              is very different to trading shares where no leverage is involved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
