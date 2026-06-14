import {Metadata} from 'next';
import Link from 'next/link';
import {routing} from '@/lib/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: 'Solutions | Angu Wire Mesh',
  description:
    'Industry-specific wire mesh solutions for bridge, mining, water conservancy, highway, coastal, and construction projects. Factory-direct supply, 15-year expertise.',
};

interface Solution {
  slug: string;
  title: string;
  description: string;
  challenge: string;
  approach: string;
  implementation: string[];
  products: string[];
  icon: string;
}

const solutions: Solution[] = [
  {
    slug: 'bridge-protection',
    title: 'Bridge & Viaduct Protection',
    description: 'Prevent rockfall damage, secure bridge piers from scour, and protect infrastructure from debris flow.',
    challenge:
      'Bridges in mountainous terrain and river valleys face constant threats: falling rocks damage decks and piers, river currents erode foundations (scour), and debris flows during monsoon season can block drainage. Without adequate protection, bridge lifespan drops from 50+ years to under 15.',
    approach:
      'Angu deploys a layered defense system: high-tensile rockfall netting above the bridge approach, gabion mattresses around piers for scour control, and debris flow barriers upstream. All systems are ISO-certified and tested to ETAG 027 Class A standards.',
    implementation: [
      'Site survey: slope angle, rock size distribution, flow velocity',
      'Rockfall net installation above bridge approach zones with soil nailing',
      'Reno mattress placement around pier bases, layered with filter fabric',
      'Debris flow ring net barriers at key inflow points upstream',
      'Annual inspection + 5-year major assessment per ESI guidelines',
    ],
    products: [
      'Rockfall Protection Net (ETAG 027)',
      'Gabion Box — heavy-duty galvanized',
      'Reno Mattress — riverbank stabilization',
      'Debris Flow Ring Net Barrier',
    ],
    icon: '🌉',
  },
  {
    slug: 'mining-safety',
    title: 'Mining & Quarry Safety Systems',
    description: 'Slope stabilization, bench protection, and blast containment for open-pit and underground mining.',
    challenge:
      'Open-pit mines have near-vertical highwalls prone to rockfalls that endanger personnel and equipment. Blast operations create flyrock hazards. Underground mine portals need controlled access and ventilation screening.',
    approach:
      'Our mining solutions combine slope drape nets, high-energy rockfall barriers, and welded mesh panels for blast containment. All materials meet MASH and international mining safety codes.',
    implementation: [
      'Geotechnical mapping of pit highwalls and slope angles',
      'Install drapery net systems over unstable faces with anchor spacing ≤3m',
      'Place high-energy barriers at bench toes (500–5000 kJ capacity)',
      'Erect welded mesh panels around blast zones with 50–100mm openings',
      'Monthly visual inspection during operation phase',
    ],
    products: [
      'Slope Protection Drape Net — high-tensile',
      'Rockfall Barrier — 500–5000 kJ',
      'Welded Wire Mesh Panel — blast containment',
      'Barbed Wire — perimeter fencing',
    ],
    icon: '⛏️',
  },
  {
    slug: 'water-conservancy',
    title: 'Water Conservancy & Flood Control',
    description: 'Riverbank stabilization, flood levee reinforcement, channel lining, and erosion control for hydraulic engineering.',
    challenge:
      'Embankments and levees face erosion during flood seasons, leading to breaches and catastrophic flooding. Irrigation channels develop leaks through soil piping. River training structures must withstand constant water pressure and debris impact.',
    approach:
      'Angu provides flexible, permeable gabion structures that self-drain, reducing hydrostatic pressure. Our PVC-coated gabion boxes resist corrosion in wet environments, extending service life to 50+ years.',
    implementation: [
      'Hydrological study: 100-year flood level, flow velocity, sediment load',
      'Gabion retaining wall construction on riverbanks, terraced where slope >30°',
      'Reno mattress channel lining with geotextile underlay',
      'Gabion weirs and check dams for grade control',
      'Post-flood season structural inspection',
    ],
    products: [
      'Gabion Box — PVC-coated',
      'Reno Mattress — heavy-duty',
      'Gabion Retaining Wall System',
      'Hesco Bastion — emergency flood barrier',
    ],
    icon: '🌊',
  },
  {
    slug: 'highway-railway',
    title: 'Highway & Railway Slope Protection',
    description: 'Road cut stabilization, avalanche barriers, and noise abatement for transportation corridors.',
    challenge:
      'Transportation corridors cut through unstable slopes. Rockfalls onto highways cause fatalities and closure costs ($100K+/day). Train derailments from slope failures are catastrophic. Communities near highways demand noise reduction.',
    approach:
      'Our transportation solutions feature active and passive rockfall protection, soil nail mesh facings, and acoustic noise barriers with integrated wire mesh for durability.',
    implementation: [
      'Geological survey along corridor: identify failure zones',
      'Active protection: soil nail + high-tensile mesh facing',
      'Passive barriers at highway level with 1000–3000 kJ absorption',
      'Noise barrier panels with absorptive core + wire mesh facade',
      'Quarterly drive-by inspection + annual detailed survey',
    ],
    products: [
      'Rockfall Protection Net — high-energy',
      'Noise Barrier Panel — acoustic grade',
      'Welded Wire Mesh — slope facing',
      'Chain Link Fence — median/dividers',
    ],
    icon: '🛤️',
  },
  {
    slug: 'coastal-defense',
    title: 'Coastal Defense & Port Infrastructure',
    description: 'Sea wall reinforcement, breakwater construction, and shore protection against storm surges and erosion.',
    challenge:
      'Rising sea levels and storm intensification threaten coastal communities worldwide. Traditional concrete sea walls crack under wave impact and prevent natural sediment flow. Port breakwaters degrade from saltwater corrosion.',
    approach:
      'Gabion sea walls and reno mattresses flex under wave loading instead of cracking, and their permeability allows sediment transport while dissipating wave energy. Extra-heavy galvanizing (ZnAl 5%) with PVC coating resists saltwater corrosion.',
    implementation: [
      'Coastal survey: tide range, wave height (Hs), sediment transport',
      'Gabion sea wall construction with stepped profile to dissipate wave energy',
      'Reno mattress toe protection extending 5m+ seaward',
      'Filter fabric layers to prevent sand washout behind structures',
      'Biannual inspection after monsoon/typhoon seasons',
    ],
    products: [
      'Gabion Box — ZnAl 5% + PVC coated',
      'Reno Mattress — coastal grade',
      'Hexagonal Wire Mesh — revetment lining',
      'Stainless Steel Rope Net — max durability',
    ],
    icon: '🏖️',
  },
  {
    slug: 'construction-site',
    title: 'Construction Site & Perimeter Security',
    description: 'Temporary and permanent fencing, dust control screening, crowd control, and site perimeter protection.',
    challenge:
      'Construction sites need secure perimeter fencing, dust control screening, and sometimes blast protection walls. Crowd management at large events requires mobile, rapidly deployable barriers. Industrial sites need vehicle-rated crash barriers.',
    approach:
      'Angu produces a full range of perimeter products: from lightweight chain link fencing to heavy-duty Hesco bastion blast walls. Triple twist hexagonal mesh provides excellent dust screening when combined with windbreak fabric.',
    implementation: [
      'Site survey: perimeter length, gate positions, blast risk assessment',
      'Chain link fence installation with concrete posts at 2.5m intervals',
      'Hesco bastion walls for explosive storage or blast-mitigation zones',
      'Crowd barrier deployment with interlocking steel frame system',
      'Weekly integrity checks, rapid panel replacement when damaged',
    ],
    products: [
      'Chain Link Fence — galvanized/PVC',
      'Hesco Bastion Blast Wall',
      'Welded Wire Mesh — dust screening',
      'Crowd Barrier — steel frame',
      'Barbed Wire — top deterrent',
    ],
    icon: '🏗️',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Industry Solutions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every project is different. Our engineers match the right wire mesh
            system to your specific geology, load conditions, and budget — not
            the other way around.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {solutions.map((sol, i) => (
            <div
              key={sol.slug}
              id={sol.slug}
              className={`py-12 ${i < solutions.length - 1 ? 'border-b border-slate-200' : ''}`}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Icon + Title */}
                <div className="lg:w-1/3 shrink-0">
                  <div className="text-4xl mb-3">{sol.icon}</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {sol.title}
                  </h2>
                  <p className="text-slate-600">{sol.description}</p>
                </div>

                {/* Right: Details */}
                <div className="lg:w-2/3 space-y-6">
                  {/* Challenge */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-rose-600 uppercase tracking-wide mb-2">
                      <span className="w-4 h-0.5 bg-rose-400" />
                      The Challenge
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{sol.challenge}</p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-2">
                      <span className="w-4 h-0.5 bg-emerald-400" />
                      Our Approach
                    </h3>
                    <p className="text-slate-700 leading-relaxed">{sol.approach}</p>
                  </div>

                  {/* Implementation */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      <span className="w-4 h-0.5 bg-blue-400" />
                      Implementation Steps
                    </h3>
                    <ol className="list-decimal list-inside text-slate-700 space-y-1">
                      {sol.implementation.map((step, si) => (
                        <li key={si}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Recommended Products */}
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
                      <span className="w-4 h-0.5 bg-amber-400" />
                      Recommended Products
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sol.products.map((p, pi) => (
                        <span
                          key={pi}
                          className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-sm rounded-full border border-amber-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need a custom solution?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Describe your project conditions — our engineers will propose a
            tailored wire mesh system within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors"
          >
            Request a Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
