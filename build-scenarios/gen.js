/* Single source of truth for the 50 fictional Texas scenarios + prompts.
   Writes:
   - ../BoodleBox Bot LegalAI/08-scenario-bank.txt  (bot knowledge)
   - ../assets/scenario-bank-data.js                (website data)
   Run: node gen.js
*/
const fs = require("fs");
const path = require("path");
const U = (code, chap, sec) => `https://statutes.capitol.texas.gov/Docs/${code}/htm/${code}.${chap}.htm#${sec}`;

const CATS = {
  A: "DWI and intoxication offenses",
  B: "Drug offenses",
  C: "Search, seizure, and procedure",
  D: "Assaultive offenses and family violence",
  E: "Property and theft",
  F: "Weapons",
  G: "Homicide and serious violence",
  H: "Public order, evading, and obstruction",
};

const S = [
{n:1,cat:"A",title:"No-refusal blood draw",charge:"DWI",cite:"Tex. Penal Code § 49.04",url:U("PE","49","49.04"),
 facts:'Client "R." refused a breath test at a no-refusal weekend; blood was drawn on a warrant.',
 focus:"Warrant-affidavit sufficiency, blood-draw procedure, and chain of custody.",
 prompt:'Act as a Texas criminal defense attorney preparing a motion to suppress a warrant blood draw. Facts (fictional): [paste]. Sources: [paste the warrant affidavit, Penal Code § 49.04, and any blood-draw records]. Using ONLY what I provide: (1) list what the affidavit had to establish for probable cause and test it line by line; (2) identify every gap in the blood-draw procedure and chain of custody; (3) draft the three strongest suppression arguments, each tied to a specific fact. Mark anything my sources do not support as [UNSUPPORTED], cite only my materials, and end with what I must verify. This is a draft for attorney review.'},
{n:2,cat:"A",title:"Rising alcohol",charge:"DWI",cite:"Tex. Penal Code § 49.04",url:U("PE","49","49.04"),
 facts:"A breath test of 0.09 was taken ninety minutes after driving, right after a meal.",
 focus:"Retrograde extrapolation and the rising-BAC defense.",
 prompt:'Act as a Texas criminal defense attorney building a rising-alcohol defense to DWI. Facts (fictional): [paste]. Sources: [paste the breath-test data, timeline, and Penal Code § 49.04]. Using ONLY what I provide: (1) explain what the State must prove about intoxication at the time of driving, not at the test; (2) lay out how the ninety-minute gap and recent eating support a rising-BAC theory; (3) list the questions I should ask the State\'s expert on retrograde extrapolation. Flag assumptions, cite only my sources, and finish with what I must verify. Draft for attorney review.'},
{n:3,cat:"A",title:"Prescription-medication DWI",charge:"DWI by drugs",cite:"Tex. Penal Code § 49.04",url:U("PE","49","49.04"),
 facts:'Client "M." took a prescribed medication, no alcohol; the officer alleges impairment.',
 focus:"The statutory definition of intoxication and DRE reliability.",
 prompt:'Act as a Texas criminal defense attorney defending a prescription-medication DWI. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.04 and the officer/DRE report]. Using ONLY what I provide: (1) state how intoxication is defined and what the State must prove for a drug DWI; (2) identify the weak points in the DRE evaluation and the loss-of-faculties proof; (3) give three cross-examination themes for the DRE. Mark unsupported points, cite only my sources, and end with what I must verify. Draft for attorney review.'},
{n:4,cat:"A",title:"DWI with a child passenger",charge:"DWI with child passenger",cite:"Tex. Penal Code § 49.045",url:U("PE","49","49.045"),
 facts:"A fictional eight-year-old was in the back seat.",
 focus:"The state-jail-felony element, the child-passenger fact, and the validity of the stop.",
 prompt:'Act as a Texas criminal defense attorney on a DWI-with-child-passenger charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.045 and § 49.04 and the stop report]. Using ONLY what I provide: (1) break the offense into elements, separating the DWI proof from the child-passenger enhancement; (2) evaluate reasonable suspicion for the stop; (3) list defense angles for each element and the single weakest link for the State. Flag gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:5,cat:"A",title:"Felony DWI, third",charge:"Felony DWI",cite:"Tex. Penal Code § 49.09",url:U("PE","49","49.09"),
 facts:"Two fictional prior DWIs are alleged for enhancement.",
 focus:"Proving prior convictions and admonishment defects in the priors.",
 prompt:'Act as a Texas criminal defense attorney attacking DWI-third enhancement. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.09 and the prior judgments/plea papers]. Using ONLY what I provide: (1) state what the State must prove to use each prior; (2) examine each prior for admonishment defects, finality, and identity problems; (3) draft objections to the enhancement paragraphs. Mark anything unsupported, cite only my sources, and end with what I must verify in the prior records. Draft for attorney review.'},
{n:6,cat:"A",title:"Intoxication assault",charge:"Intoxication assault",cite:"Tex. Penal Code § 49.07",url:U("PE","49","49.07"),
 facts:"A collision caused serious bodily injury; causation is disputed.",
 focus:"Causation, the SBI definition, and accident reconstruction.",
 prompt:'Act as a Texas criminal defense attorney on an intoxication-assault case. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.07, the crash report, and medical records]. Using ONLY what I provide: (1) separate the intoxication element from the causation element and test each; (2) analyze whether the injury meets the serious-bodily-injury definition; (3) build a causation defense around the reconstruction. Flag unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:7,cat:"A",title:"Boating while intoxicated",charge:"BWI",cite:"Tex. Penal Code § 49.06",url:U("PE","49","49.06"),
 facts:"Client operated a boat on a lake.",
 focus:"Reasonable suspicion on the water and field-sobriety validity on a dock.",
 prompt:'Act as a Texas criminal defense attorney on a boating-while-intoxicated charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.06 and the stop/SFST report]. Using ONLY what I provide: (1) analyze the basis for stopping the vessel; (2) attack the reliability of field-sobriety tests administered on a dock or unstable surface; (3) list the strongest suppression and reasonable-doubt angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:8,cat:"A",title:"DWI with lost video",charge:"DWI",cite:"Tex. Penal Code § 49.04",url:U("PE","49","49.04"),
 facts:"The dashcam malfunctioned; only the officer's narrative remains.",
 focus:"Reasonable suspicion for the stop, credibility, and the missing recording.",
 prompt:'Act as a Texas criminal defense attorney where DWI dashcam video is missing. Facts (fictional): [paste]. Sources: [paste Penal Code § 49.04, the report, and any missing-evidence policy]. Using ONLY what I provide: (1) test reasonable suspicion for the stop from the narrative alone; (2) identify what the lost video would have shown and how to argue its absence; (3) list credibility and reasonable-doubt themes. Flag unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:9,cat:"B",title:"THC vape cartridge",charge:"Possession, Penalty Group 2",cite:"Tex. Health and Safety Code § 481.116",url:U("HS","481","481.116"),
 facts:"A cartridge tested positive for Delta-9 THC.",
 focus:"The hemp defense, THC-concentration thresholds, and lab methodology.",
 prompt:'Act as a Texas criminal defense attorney on a THC-cartridge possession charge. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.116, the lab report, and any hemp definitions]. Using ONLY what I provide: (1) explain what the State must prove and where the legal-hemp line falls on Delta-9 concentration; (2) attack the lab methodology and whether it quantified concentration; (3) list the strongest reasonable-doubt angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:10,cat:"B",title:"THC edibles",charge:"Possession, Penalty Group 2",cite:"Tex. Health and Safety Code § 481.116",url:U("HS","481","481.116"),
 facts:"Gummies whose total weight includes non-drug ingredients.",
 focus:"Aggregate weight, adulterants and dilutants, and penalty-group classification.",
 prompt:'Act as a Texas criminal defense attorney on a THC-edibles possession charge. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.116 and the lab weight report]. Using ONLY what I provide: (1) explain how aggregate weight including adulterants and dilutants sets the penalty range; (2) test whether the lab established the controlled-substance weight versus total candy weight; (3) map the facts to the elements and flag the weakest. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:11,cat:"B",title:"Shared-apartment possession",charge:"Possession PG1",cite:"Tex. Health and Safety Code § 481.115",url:U("HS","481","481.115"),
 facts:"A substance was found in the common area of a shared apartment.",
 focus:"Affirmative links and joint possession.",
 prompt:'Act as a Texas criminal defense attorney on a shared-space possession charge. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.115 and the search/report]. Using ONLY what I provide: (1) list the affirmative-links factors and mark which ones the State can and cannot show; (2) build the argument that mere presence and access are not possession; (3) give the prosecution\'s best response to each. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:12,cat:"B",title:"Substance in a borrowed trunk",charge:"Possession PG1",cite:"Tex. Health and Safety Code § 481.115",url:U("HS","481","481.115"),
 facts:"Drugs were in the trunk of a borrowed car.",
 focus:"Knowledge, affirmative links, and ownership.",
 prompt:'Act as a Texas criminal defense attorney where drugs were found in a borrowed car. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.115, the report, and ownership records]. Using ONLY what I provide: (1) analyze the knowledge element given the borrowed vehicle; (2) run the affirmative-links analysis and flag the weakest links; (3) list the strongest lack-of-knowledge angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:13,cat:"B",title:"Drug-free-zone enhancement",charge:"Possession in a drug-free zone",cite:"Tex. Health and Safety Code § 481.134",url:U("HS","481","481.134"),
 facts:"Alleged possession within a school zone.",
 focus:"How the distance was measured and proof of the zone element.",
 prompt:'Act as a Texas criminal defense attorney attacking a drug-free-zone enhancement. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.134, the measurement records, and maps]. Using ONLY what I provide: (1) state what the State must prove for the zone and the distance; (2) test how the distance was measured and by whom; (3) draft objections to the enhancement. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:14,cat:"B",title:"Possession with intent to deliver",charge:"PWID PG1",cite:"Tex. Health and Safety Code § 481.112",url:U("HS","481","481.112"),
 facts:"Baggies and a scale are cited as intent.",
 focus:"The intent inference, expert testimony, and the personal-use argument.",
 prompt:'Act as a Texas criminal defense attorney contesting intent to deliver. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.112 and the offense report]. Using ONLY what I provide: (1) list the factors the State uses to infer intent to deliver and weigh each; (2) build the personal-use counter-narrative; (3) give cross-examination themes for the State\'s expert. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:15,cat:"B",title:"Paraphernalia with residue",charge:"Possession of drug paraphernalia",cite:"Tex. Health and Safety Code § 481.125",url:U("HS","481","481.125"),
 facts:"A pipe with residue only.",
 focus:"Usable-amount questions and the Class C posture.",
 prompt:'Act as a Texas criminal defense attorney on a residue-only paraphernalia case. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.125 and the lab/report]. Using ONLY what I provide: (1) explain the paraphernalia elements and the usable-amount issue if a possession count is added; (2) identify the weakest proof points; (3) outline the best resolution and trial posture. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:16,cat:"B",title:"Fraudulent prescription",charge:"Fraud to obtain a controlled substance",cite:"Tex. Health and Safety Code § 481.129",url:U("HS","481","481.129"),
 facts:"An altered prescription is alleged.",
 focus:"Knowledge and intent, and pharmacy records.",
 prompt:'Act as a Texas criminal defense attorney on a fraudulent-prescription charge. Facts (fictional): [paste]. Sources: [paste Health and Safety Code § 481.129 and the pharmacy records]. Using ONLY what I provide: (1) isolate the knowledge and intent elements; (2) test whether the records prove the client altered or knew of the alteration; (3) list the strongest lack-of-intent angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:17,cat:"C",title:"Prolonged stop for a dog sniff",charge:"Possession after a stop",cite:"Tex. Health and Safety Code § 481.115",url:U("HS","481","481.115"),
 facts:"The stop continued after the warning was written, for a dog sniff.",
 focus:"Unlawful prolongation and suppression.",
 prompt:'Act as a Texas criminal defense attorney moving to suppress after a prolonged stop. Facts (fictional): [paste]. Sources: [paste the timeline, the report, and Code of Criminal Procedure art. 38.23]. Using ONLY what I provide: (1) fix the moment the traffic mission was complete; (2) show how continuing for a dog sniff extended the stop without new reasonable suspicion; (3) draft the suppression argument and the fruits that fall with it. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:18,cat:"C",title:"Search beyond consent",charge:"Suppression, consent scope",cite:"Tex. Code Crim. Proc. art. 38.23",url:U("CR","38","38.23"),
 facts:'Client consented to a search of "the car"; an officer opened a locked container.',
 focus:"The scope of consent and suppression.",
 prompt:'Act as a Texas criminal defense attorney on a consent-scope suppression issue. Facts (fictional): [paste]. Sources: [paste the consent exchange, the report, and art. 38.23]. Using ONLY what I provide: (1) define the scope a reasonable officer would understand from the consent; (2) show how opening a locked container exceeded it; (3) draft the suppression argument. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:19,cat:"C",title:"Warrantless home entry",charge:"Suppression, exigency",cite:"Tex. Code Crim. Proc. art. 38.23",url:U("CR","38","38.23"),
 facts:"Officers entered a residence citing exigency.",
 focus:"Exigent circumstances and the limits of community caretaking.",
 prompt:'Act as a Texas criminal defense attorney challenging a warrantless home entry. Facts (fictional): [paste]. Sources: [paste the report and art. 38.23]. Using ONLY what I provide: (1) state the presumption against warrantless home entry and who bears the burden; (2) test each claimed exigency against the facts; (3) draft the suppression argument and identify the fruits. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:20,cat:"C",title:"Anonymous-tip stop",charge:"Suppression, reasonable suspicion",cite:"Tex. Code Crim. Proc. art. 38.23",url:U("CR","38","38.23"),
 facts:"A stop rested solely on an anonymous 911 tip.",
 focus:"Reliability, corroboration, and reasonable suspicion.",
 prompt:'Act as a Texas criminal defense attorney attacking a stop based on an anonymous tip. Facts (fictional): [paste]. Sources: [paste the CAD/911 records, the report, and art. 38.23]. Using ONLY what I provide: (1) assess the tip\'s reliability and predictive detail; (2) show what the officer did or did not corroborate before stopping; (3) draft the reasonable-suspicion suppression argument. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:21,cat:"C",title:"Inventory-search pretext",charge:"Suppression, inventory",cite:"Tex. Code Crim. Proc. art. 38.23",url:U("CR","38","38.23"),
 facts:"A vehicle was impounded and searched; policy compliance is disputed.",
 focus:"The inventory exception and the standardized-policy requirement.",
 prompt:'Act as a Texas criminal defense attorney on an inventory-search suppression issue. Facts (fictional): [paste]. Sources: [paste the impound/inventory policy, the report, and art. 38.23]. Using ONLY what I provide: (1) state the requirements for a valid inventory search; (2) compare the search to the written policy and flag deviations that suggest pretext; (3) draft the suppression argument. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:22,cat:"C",title:"Custodial statement",charge:"Suppression of statement",cite:"Tex. Code Crim. Proc. art. 38.22",url:U("CR","38","38.22"),
 facts:"Client was questioned at the station without warnings.",
 focus:"The custody analysis, voluntariness, and article 38.22.",
 prompt:'Act as a Texas criminal defense attorney moving to suppress a statement. Facts (fictional): [paste]. Sources: [paste the interview record, warnings if any, and art. 38.22]. Using ONLY what I provide: (1) apply the custody factors to the station interview; (2) test warnings and voluntariness under article 38.22; (3) draft the suppression argument. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:23,cat:"C",title:"Warrant particularity",charge:"Suppression, particularity",cite:"Tex. Code Crim. Proc. art. 38.23",url:U("CR","38","38.23"),
 facts:"A search warrant described the wrong unit number.",
 focus:"Particularity, good-faith limits, and suppression.",
 prompt:'Act as a Texas criminal defense attorney attacking a warrant\'s particularity. Facts (fictional): [paste]. Sources: [paste the warrant, the affidavit, and art. 38.23]. Using ONLY what I provide: (1) analyze whether the description particularly identified the place; (2) address the good-faith question under Texas law; (3) draft the suppression argument. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:24,cat:"D",title:"Assault, family violence",charge:"Assault FV",cite:"Tex. Penal Code § 22.01(b)",url:U("PE","22","22.01"),
 facts:"Mutual-combat facts; the complainant recants.",
 focus:"Self-defense, recantation, and the 911 call as an excited utterance.",
 prompt:'Act as a Texas criminal defense attorney on an assault-family-violence case with a recanting complainant. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.01, the 911 call summary, and statements]. Using ONLY what I provide: (1) map the elements and the self-defense justification; (2) analyze how the recantation and the excited-utterance 911 call cut both ways; (3) list the strongest reasonable-doubt themes. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:25,cat:"D",title:"Violation of a protective order",charge:"Violation of protective order",cite:"Tex. Penal Code § 25.07",url:U("PE","25","25.07"),
 facts:"Contact is alleged through a third party.",
 focus:"Knowledge of the order and the contact element.",
 prompt:'Act as a Texas criminal defense attorney on a protective-order-violation charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 25.07 and the order and contact records]. Using ONLY what I provide: (1) isolate the knowledge and prohibited-contact elements; (2) test whether third-party contact meets the statute as pleaded; (3) list the strongest defense angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:26,cat:"D",title:"Continuous family violence",charge:"Continuous violence against the family",cite:"Tex. Penal Code § 25.11",url:U("PE","25","25.11"),
 facts:"Two incidents within twelve months are alleged.",
 focus:"The two-incident requirement and jury unanimity.",
 prompt:'Act as a Texas criminal defense attorney on a continuous-family-violence charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 25.11 and the incident reports]. Using ONLY what I provide: (1) confirm the two-incident and twelve-month requirements and test each incident; (2) analyze the jury-unanimity issue; (3) attack the weaker incident. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:27,cat:"D",title:"Aggravated assault, SBI",charge:"Aggravated assault",cite:"Tex. Penal Code § 22.02",url:U("PE","22","22.02"),
 facts:"Serious bodily injury is disputed after a bar fight.",
 focus:"The SBI definition, self-defense, and provocation.",
 prompt:'Act as a Texas criminal defense attorney on an aggravated-assault-SBI case. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.02, § 22.01, medical records, and § 9.31]. Using ONLY what I provide: (1) test whether the injury meets serious bodily injury versus bodily injury; (2) analyze self-defense and any provocation; (3) list the strongest reasonable-doubt themes. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:28,cat:"D",title:"Aggravated assault, deadly weapon",charge:"Aggravated assault",cite:"Tex. Penal Code § 22.02(a)(2)",url:U("PE","22","22.02"),
 facts:"A common object is alleged to be a deadly weapon.",
 focus:"The deadly-weapon definition and manner of use.",
 prompt:'Act as a Texas criminal defense attorney contesting a deadly-weapon allegation. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.02 and the deadly-weapon definition and report]. Using ONLY what I provide: (1) apply the deadly-weapon definition to the object and the manner of its use; (2) argue why the proof falls short; (3) give the State\'s best response. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:29,cat:"D",title:"Terroristic threat",charge:"Terroristic threat",cite:"Tex. Penal Code § 22.07",url:U("PE","22","22.07"),
 facts:"Text messages are alleged as threats.",
 focus:"Intent to place in fear, context, and speech limits.",
 prompt:'Act as a Texas criminal defense attorney on a terroristic-threat charge from text messages. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.07 and the full message thread]. Using ONLY what I provide: (1) isolate the intent-to-place-in-fear element; (2) use the surrounding context to argue the messages were not a genuine threat; (3) note any protected-speech considerations. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:30,cat:"D",title:"Deadly conduct",charge:"Deadly conduct",cite:"Tex. Penal Code § 22.05",url:U("PE","22","22.05"),
 facts:"A firearm was discharged toward a habitation.",
 focus:"Recklessness, identity, and knowledge that someone was present.",
 prompt:'Act as a Texas criminal defense attorney on a deadly-conduct charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.05 and the offense report]. Using ONLY what I provide: (1) break out the recklessness and knowledge elements; (2) test the identity proof; (3) list the strongest reasonable-doubt angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:31,cat:"D",title:"Injury to a child",charge:"Injury to a child",cite:"Tex. Penal Code § 22.04",url:U("PE","22","22.04"),
 facts:"A caregiver is accused after an accidental injury.",
 focus:"The mental state, causation, and the reasonable-discipline question.",
 prompt:'Act as a Texas criminal defense attorney on an injury-to-a-child charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 22.04, medical records, and statements]. Using ONLY what I provide: (1) identify the culpable mental state charged and test the proof; (2) analyze causation and the accident theory; (3) list the strongest defense angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:32,cat:"E",title:"Aggregated shoplifting",charge:"Theft",cite:"Tex. Penal Code § 31.03",url:U("PE","31","31.03"),
 facts:"Several small thefts are aggregated to a felony.",
 focus:"The aggregation rules, value, and the one-scheme requirement.",
 prompt:'Act as a Texas criminal defense attorney attacking aggregated theft. Facts (fictional): [paste]. Sources: [paste Penal Code § 31.03 and the aggregation allegations]. Using ONLY what I provide: (1) state the aggregation and one-scheme requirements; (2) test whether the incidents form a single continuing scheme; (3) attack the value proof to lower the offense level. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:33,cat:"E",title:"Theft by check",charge:"Theft by check",cite:"Tex. Penal Code § 31.03 with § 31.06",url:U("PE","31","31.03"),
 facts:"A dishonored check; intent to deprive is disputed.",
 focus:"Rebutting the statutory presumption and notice.",
 prompt:'Act as a Texas criminal defense attorney on a theft-by-check case. Facts (fictional): [paste]. Sources: [paste Penal Code § 31.03 and § 31.06 and the check and notice records]. Using ONLY what I provide: (1) explain the intent-to-deprive element and the § 31.06 presumption; (2) build the argument to rebut the presumption using notice and account facts; (3) list reasonable-doubt themes. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:34,cat:"E",title:"Unauthorized use of a vehicle",charge:"UUMV",cite:"Tex. Penal Code § 31.07",url:U("PE","31","31.07"),
 facts:"Client drove a relative's car; consent is disputed.",
 focus:"Effective consent and mistake of fact.",
 prompt:'Act as a Texas criminal defense attorney on an unauthorized-use-of-a-vehicle charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 31.07 and statements]. Using ONLY what I provide: (1) analyze the effective-consent element given the family relationship; (2) develop a mistake-of-fact defense; (3) give the State\'s best response. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:35,cat:"E",title:"Burglary of a habitation",charge:"Burglary of a habitation",cite:"Tex. Penal Code § 30.02",url:U("PE","30","30.02"),
 facts:"Entry into a detached garage is alleged.",
 focus:"Habitation versus building and intent at entry.",
 prompt:'Act as a Texas criminal defense attorney on a burglary charge involving a detached garage. Facts (fictional): [paste]. Sources: [paste Penal Code § 30.02 and the definitions and report]. Using ONLY what I provide: (1) test whether the garage is a habitation or a building under the definitions; (2) analyze intent at the moment of entry; (3) argue the lesser offense if the structure is a building. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:36,cat:"E",title:"Burglary of a vehicle",charge:"Burglary of a vehicle",cite:"Tex. Penal Code § 30.04",url:U("PE","30","30.04"),
 facts:"Items were taken from an unlocked truck bed.",
 focus:"The vehicle definition, the entry element, and identity.",
 prompt:'Act as a Texas criminal defense attorney on a burglary-of-a-vehicle charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 30.04 and the report]. Using ONLY what I provide: (1) test whether an open truck bed satisfies the entry and vehicle elements; (2) evaluate the identity proof; (3) list the strongest defense angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:37,cat:"E",title:"Criminal mischief",charge:"Criminal mischief",cite:"Tex. Penal Code § 28.03",url:U("PE","28","28.03"),
 facts:"The damage valuation is disputed.",
 focus:"Pecuniary loss, intent, and identity.",
 prompt:'Act as a Texas criminal defense attorney on a criminal-mischief charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 28.03 and repair estimates]. Using ONLY what I provide: (1) explain how pecuniary loss sets the offense level and test the valuation; (2) analyze the intent element; (3) evaluate the identity proof. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:38,cat:"E",title:"Robbery",charge:"Robbery",cite:"Tex. Penal Code § 29.02",url:U("PE","29","29.02"),
 facts:"A shoplifting turned into an alleged shove on the way out.",
 focus:"The force element and whether it was in the course of theft.",
 prompt:'Act as a Texas criminal defense attorney contesting a robbery charge that began as shoplifting. Facts (fictional): [paste]. Sources: [paste Penal Code § 29.02, § 31.03, and the report]. Using ONLY what I provide: (1) test whether the contact meets the force or threat element; (2) analyze whether it occurred in the course of committing theft; (3) argue for the lesser theft offense. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:39,cat:"F",title:"Unlawful carrying of a weapon",charge:"UCW",cite:"Tex. Penal Code § 46.02",url:U("PE","46","46.02"),
 facts:"A handgun in a vehicle, with post-HB 1927 carry nuances.",
 focus:"Lawful-carry exceptions and prohibited-person status.",
 prompt:'Act as a Texas criminal defense attorney on an unlawful-carrying-of-a-weapon charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 46.02 and the client\'s status facts]. Using ONLY what I provide: (1) analyze whether the conduct falls within lawful carry and its exceptions; (2) test any prohibited-person or engaged-in-crime allegation; (3) list the strongest defense angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:40,cat:"F",title:"Felon in possession of a firearm",charge:"Unlawful possession of a firearm",cite:"Tex. Penal Code § 46.04",url:U("PE","46","46.04"),
 facts:"A firearm in a shared home; access is disputed.",
 focus:"Possession and affirmative links, and the statutory time window.",
 prompt:'Act as a Texas criminal defense attorney on a felon-in-possession charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 46.04, the prior-conviction dates, and the search report]. Using ONLY what I provide: (1) run the affirmative-links analysis for a firearm in a shared home; (2) test the statutory time window against the prior; (3) list the strongest lack-of-possession angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:41,cat:"F",title:"Places weapons prohibited",charge:"Places weapons prohibited",cite:"Tex. Penal Code § 46.03",url:U("PE","46","46.03"),
 facts:"A firearm is alleged at a prohibited location.",
 focus:"Notice, knowledge, and the location element.",
 prompt:'Act as a Texas criminal defense attorney on a places-weapons-prohibited charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 46.03 and the location and signage facts]. Using ONLY what I provide: (1) test the location and notice elements; (2) analyze the knowledge requirement; (3) list the strongest defense angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:42,cat:"F",title:"Prohibited weapon",charge:"Prohibited weapon",cite:"Tex. Penal Code § 46.05",url:U("PE","46","46.05"),
 facts:"An alleged short-barreled firearm.",
 focus:"The definition, federal compliance, and knowledge.",
 prompt:'Act as a Texas criminal defense attorney on a prohibited-weapon charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 46.05, the weapon description, and any federal registration]. Using ONLY what I provide: (1) apply the statutory definition to the weapon; (2) analyze the federal-compliance exception and the knowledge element; (3) list the strongest defense angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:43,cat:"G",title:"Manslaughter, single-vehicle crash",charge:"Manslaughter",cite:"Tex. Penal Code § 19.04",url:U("PE","19","19.04"),
 facts:"A passenger died; recklessness is disputed.",
 focus:"Recklessness versus criminal negligence and causation.",
 prompt:'Act as a Texas criminal defense attorney on a manslaughter charge from a crash. Facts (fictional): [paste]. Sources: [paste Penal Code § 19.04, § 19.05, and the crash reconstruction]. Using ONLY what I provide: (1) distinguish recklessness from criminal negligence on these facts; (2) analyze causation; (3) argue for the lesser offense or acquittal. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:44,cat:"G",title:"Murder and self-defense",charge:"Murder",cite:"Tex. Penal Code § 19.02",url:U("PE","19","19.02"),
 facts:"A confrontation at the client's home.",
 focus:"Self-defense and defense of habitation, and reasonableness.",
 prompt:'Act as a Texas criminal defense attorney raising self-defense to a murder charge at the client\'s home. Facts (fictional): [paste]. Sources: [paste Penal Code § 19.02, § 9.31, § 9.32, and the scene facts]. Using ONLY what I provide: (1) map the self-defense and defense-of-habitation elements to the facts; (2) analyze the reasonableness and any presumption; (3) anticipate the State\'s strongest attack on justification. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:45,cat:"G",title:"Criminally negligent homicide",charge:"Criminally negligent homicide",cite:"Tex. Penal Code § 19.05",url:U("PE","19","19.05"),
 facts:"A firearm discharged while being cleaned.",
 focus:"The negligence standard and accident.",
 prompt:'Act as a Texas criminal defense attorney on a criminally-negligent-homicide charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 19.05 and the scene and forensic facts]. Using ONLY what I provide: (1) state the criminal-negligence standard and test the proof; (2) develop the accident theory; (3) list the strongest reasonable-doubt angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},

{n:46,cat:"H",title:"Evading arrest with a vehicle",charge:"Evading arrest or detention",cite:"Tex. Penal Code § 38.04",url:U("PE","38","38.04"),
 facts:"Client says he did not know it was police.",
 focus:"Knowledge and the lawfulness of the attempted detention.",
 prompt:'Act as a Texas criminal defense attorney on an evading-with-a-vehicle charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 38.04 and the pursuit report and video]. Using ONLY what I provide: (1) test the knowledge element that the client knew a peace officer was attempting to detain him; (2) analyze the lawfulness of the attempted detention; (3) list the strongest defense angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:47,cat:"H",title:"Resisting arrest",charge:"Resisting arrest",cite:"Tex. Penal Code § 38.03",url:U("PE","38","38.03"),
 facts:"Alleged pulling away during handcuffing.",
 focus:"The use-of-force element and the lawfulness of the arrest.",
 prompt:'Act as a Texas criminal defense attorney on a resisting-arrest charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 38.03 and the report and video]. Using ONLY what I provide: (1) test whether pulling away meets the use-of-force element; (2) note that lawfulness of the arrest is not a defense but affects the facts and related charges; (3) list the strongest reasonable-doubt angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:48,cat:"H",title:"Failure to identify",charge:"Failure to identify",cite:"Tex. Penal Code § 38.02",url:U("PE","38","38.02"),
 facts:"A false name given during a stop.",
 focus:"Arrest versus detention and the elements.",
 prompt:'Act as a Texas criminal defense attorney on a failure-to-identify charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 38.02 and the encounter facts]. Using ONLY what I provide: (1) determine whether the client was under arrest or merely detained, which changes the offense; (2) map the facts to the correct subsection; (3) list the strongest defense angles. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:49,cat:"H",title:"Tampering with evidence",charge:"Tampering with physical evidence",cite:"Tex. Penal Code § 37.09",url:U("PE","37","37.09"),
 facts:"A baggie allegedly discarded during a stop.",
 focus:"Knowledge of an investigation and the concealment element.",
 prompt:'Act as a Texas criminal defense attorney on a tampering-with-evidence charge. Facts (fictional): [paste]. Sources: [paste Penal Code § 37.09 and the report and video]. Using ONLY what I provide: (1) test the knowledge-of-an-investigation and concealment or destruction elements; (2) analyze whether dropping an item meets the statute; (3) list the strongest defense angles. Mark unsupported points, cite only my sources, and end with what to verify. Draft for attorney review.'},
{n:50,cat:"H",title:"Online solicitation of a minor",charge:"Online solicitation of a minor",cite:"Tex. Penal Code § 33.021",url:U("PE","33","33.021"),
 facts:'A sting where the "minor" was an officer.',
 focus:"Intent, the belief element, and entrapment.",
 prompt:'Act as a Texas criminal defense attorney on an online-solicitation sting. Facts (fictional): [paste]. Sources: [paste Penal Code § 33.021 and the full chat transcript]. Using ONLY what I provide: (1) isolate the intent and belief elements the State must prove; (2) analyze an entrapment defense against the officer conduct; (3) list the strongest reasonable-doubt themes from the transcript. Mark gaps, cite only my sources, and end with what to verify. Draft for attorney review.'},
];

// ── Build the bot knowledge file (.txt) ────────────────────
let txt = `# Scenario Bank — 50 Fictional Texas Criminal Defense Fact Patterns and Prompts

Fifty short, fictional practice scenarios for the LegalAI bot, spanning common Texas criminal defense matters. Each names a charge with its Texas statute, a one or two sentence fact pattern, a defense focus, and a ready-to-run prompt.

**Use safely.** Every scenario is fictional and simplified for practice. Statute section numbers are for orientation only; confirm the current text and elements at statutes.capitol.texas.gov before relying on them. Never replace these with real client-identifying facts in a consumer tool. When a user picks one, apply the TCDLAi framework, ground only in sources the user pastes, and mark anything unsupported.

Client names are single fictional initials. "SBI" means serious bodily injury. Weights, priors, and lab results are invented.

---
`;
let cur = "";
for (const s of S) {
  if (s.cat !== cur) { cur = s.cat; txt += `\n## ${s.cat}. ${CATS[s.cat]}\n\n`; }
  txt += `**${s.n}. ${s.title}** — ${s.charge} (${s.cite})\n`;
  txt += `Facts: ${s.facts}\n`;
  txt += `Focus: ${s.focus}\n`;
  txt += `Prompt: ${s.prompt}\n\n`;
}
txt += `---\n\n*These are practice materials, not legal advice. Elements and penalties change; verify against the current Texas statutes and the controlling pattern jury charge. Every output built from these is a draft for attorney review.*\n`;

fs.writeFileSync(path.join(__dirname, "..", "BoodleBox Bot LegalAI", "08-scenario-bank.txt"), txt);

// ── Build the website data file ────────────────────────────
const CAT_JSON = JSON.stringify(CATS);
const S_JSON = JSON.stringify(S);
const js = `/* Generated by build-scenarios/gen.js — do not edit by hand. */\n` +
  `window.SCENARIO_CATS = ${CAT_JSON};\n` +
  `window.SCENARIO_BANK = ${S_JSON};\n`;
fs.writeFileSync(path.join(__dirname, "..", "assets", "scenario-bank-data.js"), js);

console.log("wrote 08-scenario-bank.txt and assets/scenario-bank-data.js —", S.length, "scenarios");
