<?php

namespace App\Form;

use App\Entity\CategoryIngredient;
use App\Repository\CategoryIngredientRepository;
use App\Entity\Ingredient;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class IngredientType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $this->user = $options['user'];
        $builder
            ->add('name', TextType::class, [
                "label" => "Nom",
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
            ->add('category', EntityType::class, [
                'class' => CategoryIngredient::class,
                'query_builder' => function (CategoryIngredientRepository $a) {
                    return $a->createQueryBuilder('ci')
                        ->where('ci.user = :user')
                        ->setParameter('user', $this->user)
                    ;
                },
                'choice_label' => 'name',
                'multiple' => false,
                'expanded' => false,
                'label' => 'Catégorie',
                "label_attr" => ["class" => "block text-gray-700 text-sm font-bold mb-2"],
                'attr' => ['class' => 'mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Ingredient::class,
            'user' => null,
        ]);
    }
}
